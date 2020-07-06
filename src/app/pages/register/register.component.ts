import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ApiManagerService } from '../../services/api-manager.service';
import { User } from '../../services/api-manager.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  users: [] = [];

  newUser: User = {name : "", 
  surname : "", 
  email : "",
  role : "" }

  emailValid = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  errorNameBoolean: boolean = false;
  
  errorEmailBoolean: boolean = false;
  
  errorSurnameBoolean: boolean = false;

  errorName: string = "";

  errorEmail: string= "";

  errorSurname: string= "";

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
    // if (!this.emailValid.test(this.email))
  validationEmail() {
    if (!this.emailValid.test(this.newUser.email)) {
      this.errorEmailBoolean = true;
      this.errorEmail = "The email isn't correct";
    } else {
      this.errorEmailBoolean = false;
    }
  }



}
