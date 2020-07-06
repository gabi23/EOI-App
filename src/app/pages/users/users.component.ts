import { Component, OnInit } from '@angular/core';
import { User, Course, ApiManagerService } from '../../services/api-manager.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';


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

  constructor(private apiManagerServices: ApiManagerService, public dialog: MatDialog) {
    this.loadUsers();
    this.loadCourses();
  }

  ngOnInit(): void { }

  openDialogDelete(user : User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '275px',
      data: {name: this.safeWord},
      
      
    });
   
    dialogRef.afterClosed().subscribe(result => {
      this.safeWord = result;
      this.deleteUser(user);
    });
  }

  async loadUsers(): Promise<void> {
    this.users = await this.apiManagerServices.getAllUsers();
  }

  async loadCourses(): Promise<void> {
    this.courses = await this.apiManagerServices.getCourses();
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

  deleteUser(user : User) {
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
