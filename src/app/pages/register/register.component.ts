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

  selectedImage = null;

  courseAdded: boolean = false;

  constructor(private apiManagerServices: ApiManagerService) { }

  ngOnInit(): void {}

  onImageSelected(event) {
    let file: File = <File> event.target.files[0];
    let myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.selectedImage = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  addCourse() {
    this.newCourse.name = this.name;
    this.newCourse.studyField = this.studyField;
    this.newCourse.description = this.description;
    this.apiManagerServices.insertCourse(this.newCourse);
    this.newCourse.image = this.selectedImage;
    this.courseAdded = true;
    setTimeout(() => (this.courseAdded = false), 3000);
  }

}
