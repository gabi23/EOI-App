import { Component, OnInit } from '@angular/core';
import { ApiManagerService, Course } from '../../services/api-manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  newCourse: Course = {
    name: "",
    studyField: "",
    description: ""
  }

  name: string;
  studyField: string;
  description: string;

  courseAdded: boolean = false;

  constructor(private apiManagerServices: ApiManagerService) { }

  ngOnInit(): void {}

  addCourse() {
    this.newCourse.name = this.name;
    this.newCourse.studyField = this.studyField;
    this.newCourse.description = this.description;
    this.apiManagerServices.insertCourse(this.newCourse);
    this.courseAdded = true;
    setTimeout(() => (this.courseAdded = false), 3000);
  }

}
