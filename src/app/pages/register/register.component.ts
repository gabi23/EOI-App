import { Component, OnInit } from '@angular/core';
import { ApiManagerService, Course } from '../../services/api-manager.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';
import { FirebaseStorageService } from '../../services/firebase-storage.service';

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
  safeWord : string;
  selectedImage: File = null;
  nameSelectedImage: string = "";
  publicURLImage: string = "";

  courseAdded: boolean = false;

  constructor(private apiManagerServices: ApiManagerService, private firebaseStorage: FirebaseStorageService, public dialog: MatDialog) { }

  ngOnInit(): void {}

  openDialogCourse(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '275px',
      data: {name: this.safeWord},  
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if (result == "admin1234") {
        this.addCourse();
      }

    });
  }

  onImageSelected(event) {
    this.selectedImage = <File> event.target.files[0];
    this.nameSelectedImage = event.target.files[0].name;
  }

  async uploadImageToFirebase(){
    await this.firebaseStorage.upload(`courses/${this.nameSelectedImage}`, this.selectedImage);
    this.publicURLImage = await this.firebaseStorage.getPublicURL(`courses/${this.nameSelectedImage}`); 
  }
  
  async addCourse() {
    this.newCourse.name = this.name;
    this.newCourse.studyField = this.studyField;
    this.newCourse.description = this.description;
    if(this.selectedImage != null) await this.uploadImageToFirebase();
    this.newCourse.image = this.publicURLImage;
    this.apiManagerServices.insertCourse(this.newCourse);
    this.courseAdded = true;
    
    setTimeout(() => (this.courseAdded = false), 3000);
    this.safeWord = "";
  }

}
