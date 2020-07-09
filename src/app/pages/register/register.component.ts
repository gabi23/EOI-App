import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '../../services/api-manager.service';
import { User } from '../../services/api-manager.service';
import { Course } from '../../services/api-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  user: User;

  courses: Course[];

  newCourses: number[] = [];

  newCourse: Course = {name: "", studyField: "", description: ""};

  newUser: User = {name : "", surname : "",  email : "" , role: "", gitHubLogin: ""}

  emailValid = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  numberValid = new RegExp(/^\d+$/);

  errorNameBoolean: boolean = false;

  errorEmailBoolean: boolean = false;

  errorSurnameBoolean: boolean = false;

  errorPhoneBoolean: boolean = false;

  addedNewCourseValidation: boolean = false;

  addedNewUserValidation: boolean = false;

  errorName: string = "";

  errorEmail: string = "";

  errorSurname: string = "";

  errorPhone: string = "";

  constructor(private apiManagerServices: ApiManagerService, private route: ActivatedRoute) {
    this.loadCourses();
  }

  ngOnInit(): void { }

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


  feedBackNewCourseAdded(){
    return this.addedNewCourseValidation=true;
  }

  addNewUser() {
    this.apiManagerServices.insertUser(this.newUser)
      .then(i => i)
      .catch((error) => { console.log(error) });
  }

  addNewCourse(){
    this.apiManagerServices.insertCourse(this.newCourse)
    .then(i => i)
    .catch((error) => { console.log(error) });
  }

  feedBackNewUserAdded(){
    return this.addedNewUserValidation=true;
  }

  validationName() {
    if (this.newUser.name.length < 2 || this.newUser.name.length > 30) {
      this.errorNameBoolean = true;
      this.errorName = "The name must have between 2 to 30 characters";
    } else {
      this.errorNameBoolean = false;
    }
    
  }

  validationSurname() {
    if (this.newUser.surname.length < 2 || this.newUser.surname.length > 30) {
      this.errorSurnameBoolean = true;
      this.errorSurname = "The surname must have between 2 to 30 characters";
    } else {
      this.errorSurnameBoolean = false;
    }
  }

  validationEmail() {
    if (!this.emailValid.test(this.newUser.email)) {
      this.errorEmailBoolean = true;
      this.errorEmail = "The email isn't correct";
    } else {
      this.errorEmailBoolean = false;
    }
  }

  validationPhone() {

    if (!this.numberValid.test(this.newUser.phone.toString()) || this.newUser.phone.toString().length != 9) {
      this.errorPhoneBoolean = true;
      this.errorPhone = "The number isn't correct";
    } else { this.errorPhoneBoolean = false; }
  }
}