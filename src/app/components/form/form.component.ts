import { Component, OnInit } from '@angular/core';
import { ApiManagerService, User, Course } from '../../services/api-manager.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  isEdit: boolean = false;

  nameValid = new RegExp(/^[A-Za-záÁÉéÍíÓóÚú ]+$/i);
  emailValid = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  phoneValid = new RegExp(/^([+0-9 ]{9,})*$/);

  user: User = {
    name: "",
    surname: "",
    email: "",
    phone: 0,
    courses: [],
    gitHubLogin: ""
  }; 

  courses: Course[];
  
  newName: string;
  newSurname: string;
  newPhone: number;
  newEmail: string;
  newGitHubLogin: string;
  newCourses: number[] = [];

  errorInNewName: boolean = false;
  errorInNewSurname: boolean = false;
  errorInNewPhone: boolean = false;
  errorInNewEmail: boolean = false;
  
  nameErrorMesagge: string = "";
  surnameErrorMesagge: string = "";
  phoneErrorMesagge: string = "";
  emailErrorMesagge: string = "";

  userAdded: boolean = false;
  userUpdated: boolean = false;

  constructor(private apiManagerServices: ApiManagerService, private route: ActivatedRoute, public router: Router){
    this.isEdit = this.route.snapshot.url.toString().includes('edit'); 
    this.loadUser();
    this.loadCourses();
  }

  ngOnInit(): void{ }

  async loadUser(){
    await this.apiManagerServices.getUser(Number(this.route.snapshot.paramMap.get("id")))
      .then((user) => {
        this.user = user;
       }).catch((err) => {
         console.log (err);
      });
    
    this.user.courses.forEach(courseId => this.newCourses.push(courseId));
  }

  async loadCourses(): Promise<void> {
    this.courses = await this.apiManagerServices.getCourses();
  }

  isChecked(id: number): boolean{
    return this.user.courses.includes(id);
  }

  onCheckboxChange(e) {
    if(e.target.checked) {
      this.newCourses.push(parseInt(e.target.value));
    }else {
      let i: number = 0;
      this.newCourses.forEach(courseId => {
        if(courseId == e.target.value) {
          this.newCourses.splice(i, 1);
          return;
        }
        i++;
      });
    }
    console.log(this.newCourses)
  }

  validateName() {
    if (this.newName.length < 2) {
      this.errorInNewName = true;
      this.nameErrorMesagge = "Minimum 2 letters";
    } else if (!this.nameValid.test(this.newName)) {
      this.errorInNewName = true;
      this.nameErrorMesagge = "Can't have numbers";
    } else {
      this.errorInNewName = false;
      this.nameErrorMesagge = "";
    }
  }

  validateSurname() {
    if (this.newSurname.length < 2) {
      this.errorInNewSurname = true;
      this.surnameErrorMesagge = "Minimum 2 letters";
    } else if (!this.nameValid.test(this.newSurname)) {
      this.errorInNewSurname = true;
      this.nameErrorMesagge = "Can't have numbers";
    } else {
      this.errorInNewSurname = false;
      this.surnameErrorMesagge = "";
    }
  }

  async validateEmail() {
    if (!this.emailValid.test(this.newEmail)) {
      this.errorInNewEmail = true;
      this.emailErrorMesagge = "Must be user@server";
    } else if (await this.apiManagerServices.findEmail(this.newEmail)) {
      this.errorInNewEmail = true;
      this.emailErrorMesagge = "This email already exists";
    } else {
      this.errorInNewEmail = false;
      this.emailErrorMesagge = "";
    }
  }

  validatePhone() {
    if (this.newPhone.toString().length < 9) {
      this.errorInNewPhone = true;
      this.phoneErrorMesagge = "Minimum 9 numbers";
    }else if(!this.phoneValid.test(this.newPhone.toString())){
      this.errorInNewPhone = true;
      this.phoneErrorMesagge = "Must be numbers";
    }else {
      this.errorInNewPhone = false;
      this.phoneErrorMesagge = "";
    }
  }

  nameOnFocus() {
    this.errorInNewName = false;
    this.nameErrorMesagge = "";
  }

  emailOnFocus() {
    this.errorInNewEmail = false;
    this.emailErrorMesagge = "";
  }

  phoneOnFocus() {
    this.errorInNewPhone = false;
    this.phoneErrorMesagge = "";
  }

  safeWordGenerator():string {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+=?@_/#.";
    let safeword = "";
    for (let i=0; i<9; i++) safeword +=characters.charAt(Math.floor(Math.random()*characters.length));
    return safeword;
  }

  async updateUser(){
    if (
      this.errorInNewName == false &&
      this.errorInNewSurname == false &&
      this.errorInNewEmail == false &&
      this.errorInNewPhone == false
    ){
      this.user.name = this.newName;
      this.user.surname = this.newSurname;
      this.user.email = this.newEmail;
      this.user.phone = this.newPhone;
      this.user.gitHubLogin = this.newGitHubLogin;
      this.user.courses = this.newCourses;
    }
    await this.apiManagerServices.updateUser(this.user.id, this.user);
    this.userUpdated = true;
    setTimeout(() =>{
      this.userUpdated = false;
      this.router.navigate(['users']);
    }, 3000);    
  }

  async addNewUser(){
    if(
      this.errorInNewName == false &&
      this.errorInNewSurname == false &&
      this.errorInNewEmail == false &&
      this.errorInNewPhone == false
    ){
      this.user.name = this.newName;
      this.user.surname = this.newSurname;
      this.user.email = this.newEmail;
      this.user.phone = this.newPhone;
      this.user.gitHubLogin = this.newGitHubLogin;
      this.user.courses = this.newCourses;
      this.user.safeWord = this.safeWordGenerator();      
    }
    await this.apiManagerServices.insertUser(this.user)
    await this.apiManagerServices.sendMessage(this.user);
    this.userAdded = true;
    setTimeout(() => (this.userAdded = false), 3000);
  }

}