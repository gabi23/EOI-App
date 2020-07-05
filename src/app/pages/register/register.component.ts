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

  newUser: User = { name: "", email: "" }

  errorNameBoolean: boolean = false;
  
  errorEmailBoolean: boolean = false;
  
  errorName: string = "";

  errorEmail: string= "";

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
  validationEmail() {
    if (!this.newUser.email.includes("@")) {
      this.errorEmailBoolean = true;
      this.errorEmail = "The email isn't correct";
    } else {
      this.errorEmailBoolean = false;
    }
  }
}
