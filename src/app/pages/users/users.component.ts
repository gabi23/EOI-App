import { Component, OnInit } from '@angular/core';
import { User, Course, ApiManagerService } from '../../services/api-manager.service';

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

  constructor(private apiManagerServices: ApiManagerService) {
    this.loadUsers();
    this.loadCourses();
  }

  ngOnInit(): void { }

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

  deleteUser(id : number) {
    this.apiManagerServices.deleteUser(id)
    .then(res => {
      this.users= this.users.filter(user => user.id != id)
    })
    .catch(error => console.log(error))
  }

}
