import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';
import { Router } from '@angular/router';
import { User, Course, FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  courses: Course[] = [];
  course: Course[] = [];
  nameOfCourses: string[][] = [];
  courseSelected: string = "All courses";
  userToSearch: string = "";
  safeWord : string;

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog, public router: Router) {
    this.loadUsers();
    this.loadCourses();
  }

  ngOnInit(): void { }

  openDialogDelete(user: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '275px',
      data: {name: this.safeWord},      
    });
   
    dialogRef.afterClosed().subscribe(result => {
      this.safeWord = result;
      this.deleteUser(user);
    });
  }

  //Dialogo para editar
  openDialogEdit(user: User): void {
    console.log("dialog")
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '275px',
      data: {name: this.safeWord},      
    });
   
    dialogRef.afterClosed().subscribe(result => {      
      if ( (result == "admin1234" || result == user.safeWord) && result != undefined) {
        this.router.navigate(['users/edit', user.id])
      }      
    });
  }

  async loadUsers() {
    this.users = await this.firebaseService.getAllUsers();
  }

  async loadCourses(): Promise<void> {
    this.courses = await this.firebaseService.getAllCourses();
  }

  async searchUser(){
    this.users = [];
    this.nameOfCourses = [];
    console.log(this.userToSearch)
    this.users = await this.firebaseService.getUserByName(this.userToSearch);
    this.loadCourses();
  }

  async courseFilter(){
    if(this.courseSelected != "All courses"){
      this.users = [];
      this.nameOfCourses = [];
      const course = await this.firebaseService.getCourseByName(this.courseSelected);
      console.log("hello", course)
      this.users = await this.firebaseService.getUsersByCourse(course[0]);
      this.loadCourses();
    }
    else{
      this.loadUsers();
      this.loadCourses();
    }    
  }

  deleteUser(user: User) {
    if (this.safeWord == "admin1234" || this.safeWord == user.safeWord) { // falta añadir la palabra de seguridad de la persona tambien
      this.firebaseService.deleteUser(user.id);
      this.loadUsers();
    }
    this.safeWord = "";
  }

}
