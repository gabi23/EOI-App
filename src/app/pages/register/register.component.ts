import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '../../services/api-manager.service';
import { User } from '../../services/api-manager.service';
import { Course } from '../../services/api-manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  users: [] = [];

  newUser: User = {
    name: "",
    surname: "",
    email: "",
    role: ""
  }

  newCourse: Course = {
    name: "",
    studyField: "",
    description: ""
  }

  emailValid = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  numberValid = new RegExp(/^\d+$/);

  errorNameBoolean: boolean = false;

  errorEmailBoolean: boolean = false;

  errorSurnameBoolean: boolean = false;

  errorPhoneBoolean: boolean = false;

  errorRoleBoolean: boolean = false;

  errorName: string = "";

  errorEmail: string = "";

  errorSurname: string = "";

  errorPhone: string = "";

  errorRole: string = "";

  constructor(private ApiManagerService: ApiManagerService) {

  }

  ngOnInit(): void { }

  addNewUser() {
    this.ApiManagerService.insertUser(this.newUser)
      .then(i => i)
      .catch((error) => { console.log(error) });
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

    if (!this.numberValid.test(this.newUser.phone) || this.newUser.phone.length != 9) {
      this.errorPhoneBoolean = true;
      this.errorPhone = "The number isn't correct";
    } else { this.errorPhoneBoolean = false; }
  }

  // validationRole() {
  //   if (this.newUser.role == "admin123") {
  //     this.errorRoleBoolean = true;
  //     this.errorRole = "Secret word is correct, you are admin"
  //   } else {
  //     this.errorRoleBoolean = false;
  //     this.errorRole = "Secret word invalid, you are user"
  //   }
  // }

}