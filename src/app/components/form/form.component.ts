import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '../../services/api-manager.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';
import { FirebaseService, User, Course } from '../../services/firebase.service';

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
    gitHubLogin: "",
    image: ""
  }; 

  courses: Course[];
  
  newName: string;
  newSurname: string;
  newPhone: number;
  newEmail: string;
  newGitHubLogin: string;
  newCourses: string[] = [];

  errorInNewName: boolean = false;
  errorInNewSurname: boolean = false;
  errorInNewPhone: boolean = false;
  errorInNewEmail: boolean = false;
  
  nameErrorMesagge: string = "";
  surnameErrorMesagge: string = "";
  phoneErrorMesagge: string = "";
  emailErrorMesagge: string = "";
  safeWord : string;
  userAdded: boolean = false;
  userUpdated: boolean = false;

  selectedImage: File = null;
  nameSelectedImage: string = "";
  publicURLImage: string = "";

  constructor(private apiManagerServices: ApiManagerService, private route: ActivatedRoute, private firebaseService: FirebaseService, public router: Router, public dialog: MatDialog){
    this.isEdit = this.route.snapshot.url.toString().includes('edit'); 
    this.loadUser();
    this.loadCourses();
  }

  ngOnInit(): void{ }


  openDialogEditOn(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '275px',
      data: {name: this.safeWord},  
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if (result == "admin1234" || result == this.user.safeWord) {
        this.updateUser()
      }

    });
  }

  openDialogNewUser(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '275px',
      data: {name: this.safeWord},  
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if (result == "admin1234") {
        this.addNewUser();
      }

    });
  }

  async loadUser(){
    this.user = await this.firebaseService.getUser(this.route.snapshot.paramMap.get("id"))
    this.user.courses.forEach(courseId => this.newCourses.push(courseId));
  }

  async loadCourses() {
    this.courses = await this.firebaseService.getAllCourses();
  }

  isChecked(id: string): boolean{
    return this.user.courses.includes(id);
  }

  onCheckboxChange(event) {
    if(event.target.checked) {
      this.newCourses.push(event.target.value);
    }else {
      let i: number = 0;
      this.newCourses.forEach(courseId => {
        if(courseId == event.target.value) {
          this.newCourses.splice(i, 1);
          return;
        }
        i++;
      });
    }
  }

  validateName() {
    if (this.newName.length < 2) {
      this.errorInNewName = true;
      this.nameErrorMesagge = "Mínimo 2 caracteres";
    } else if (!this.nameValid.test(this.newName)) {
      this.errorInNewName = true;
      this.nameErrorMesagge = "No se permiten números";
    } else {
      this.errorInNewName = false;
      this.nameErrorMesagge = "";
    }
  }

  validateSurname() {
    if (this.newSurname.length < 2) {
      this.errorInNewSurname = true;
      this.surnameErrorMesagge = "Mínimo 2 caracteres";
    } else if (!this.nameValid.test(this.newSurname)) {
      this.errorInNewSurname = true;
      this.nameErrorMesagge = "No se permiten números";
    } else {
      this.errorInNewSurname = false;
      this.surnameErrorMesagge = "";
    }
  }

  async validateEmail() {
    let aux = await this.firebaseService.findEmail(this.newEmail);
    if (!this.emailValid.test(this.newEmail)) {
      this.errorInNewEmail = true;
      this.emailErrorMesagge = "Debe tener la estructura: usuario@servidor";
    } else if (aux.length > 0) {
      this.errorInNewEmail = true;
      this.emailErrorMesagge = "El email ya se encuentra en uso";
    } else {
      this.errorInNewEmail = false;
      this.emailErrorMesagge = "";
    }
  }

  validatePhone() {
    if (this.newPhone.toString().length < 9) {
      this.errorInNewPhone = true;
      this.phoneErrorMesagge = "Mínimo 9 números";
    }else if(!this.phoneValid.test(this.newPhone.toString())){
      this.errorInNewPhone = true;
      this.phoneErrorMesagge = "Deben ser números";
    }else {
      this.errorInNewPhone = false;
      this.phoneErrorMesagge = "";
    }
  }

  nameOnFocus() {
    this.errorInNewName = false;
    this.nameErrorMesagge = "";
  }

  surnameOnFocus() {
    this.errorInNewSurname = false;
    this.surnameErrorMesagge = "";
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

  onImageSelected(event) {
    this.selectedImage = <File> event.target.files[0];
    this.nameSelectedImage = event.target.files[0].name;
  }

  async uploadImageToFirebase(){
    await this.firebaseService.upload(`users/${this.nameSelectedImage}`, this.selectedImage);
    this.publicURLImage = await this.firebaseService.getPublicURL(`users/${this.nameSelectedImage}`); 
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
      if(this.selectedImage != null) await this.uploadImageToFirebase();
      this.user.image = this.publicURLImage;
    }
    this.firebaseService.updateUser(this.user.id, this.user);
    this.userUpdated = true;
    this.safeWord = "";
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
      this.errorInNewPhone == false &&
      this.newName.length > 0 &&
      this.newSurname.length > 0 &&
      this.newEmail.length > 0
    ){
      this.user.name = this.newName;
      this.user.surname = this.newSurname;
      this.user.email = this.newEmail;
      this.user.phone = this.newPhone;
      this.user.gitHubLogin = this.newGitHubLogin;
      this.user.courses = this.newCourses;
      this.user.safeWord = this.safeWordGenerator();
      if(this.selectedImage != null) await this.uploadImageToFirebase();
      this.user.image = this.publicURLImage;
      await this.firebaseService.addUser(this.user);
      this.apiManagerServices.sendMessage(this.user);
      this.userAdded = true;
      this.newName = "";
      this.newSurname = "";
      this.newEmail = "";
      this.newPhone = null;
      this.newGitHubLogin = "";
      setTimeout(() => (this.userAdded = false), 3000);
    }
    this.safeWord = "";
  }

}