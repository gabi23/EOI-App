import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '../../services/api-manager.service';
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
  nameOfCourses: string[][] = [];
  courseSelected: string = "All courses";
  userToSearch: string = "";
  safeWord : string;

  constructor(private apiManagerServices: ApiManagerService, private firebaseService: FirebaseService, public dialog: MatDialog, public router: Router) {
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

  loadUsers() {
    this.users = this.firebaseService.getAllUsers();
    console.log(this.users)
  }

  async loadCourses(): Promise<void> {
    this.courses = this.firebaseService.getAllCourses();
    this.users.forEach(user => {
      this.apiManagerServices.getUserCourses(user.courses)
        .then(courses => {
          this.nameOfCourses.push(courses.map(course => course.name));
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  async searchUser(){
    this.users = [];
    this.nameOfCourses = [];
    this.users = await this.apiManagerServices.getUserByName(this.userToSearch);
    this.loadCourses();
  }

  async courseFilter(){
    if(this.courseSelected != "All courses"){
      this.users = [];
      this.nameOfCourses = [];
      const course = await this.apiManagerServices.getCourseByName(this.courseSelected);
      this.users = await this.apiManagerServices.getUsersByCourses(course[0].id);
      this.loadCourses();
    }
    else{
      this.loadUsers();
      this.loadCourses();
    }    
  }

  deleteUser(user: User) {
    if (this.safeWord == "admin1234" || this.safeWord == user.safeWord) { // falta añadir la palabra de seguridad de la persona tambien
      this.apiManagerServices.deleteUser(user.id)
      .then(res => {
        this.users= this.users.filter(aux => aux.id != user.id)
      })
      .catch(error => console.log(error))
    }
    this.safeWord = "";
  }

}
