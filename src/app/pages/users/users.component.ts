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
  userToSearch: string = "";
  userFound: User[] = [];
  course: string = "All courses";
  usersInCourse: User[] = [];

  constructor(private apiManagerServices: ApiManagerService) {
    this.loadUsers();
    this.loadCourses();
  }

  ngOnInit(): void { }

  async loadUsers(): Promise<void> {
    const users = await this.apiManagerServices.getAllUsers();
    this.users = users;
  }

  async loadCourses(): Promise<void> {
    const courses = await this.apiManagerServices.getCourses();
    this.courses = courses;

    this.users.forEach(user => {
      user.nameOfCourses = [];
      this.courses.forEach(course => {
        if(user.courses.includes(course.id)) user.nameOfCourses.push(course.name);
      });
    });
  }

  searchUser(){
    this.userFound = [];
    if(this.userToSearch != ""){
      this.users.forEach(user => {
        if(user.name.toLowerCase().includes(this.userToSearch.toLowerCase())){
            this.userFound.push(user);
        }
      });
    }    
  }

  back(){
    this.userFound = [];
    this.userToSearch = "";
  }

  courseSelected(){
    this.usersInCourse = [];
    this.usersInCourse = this.users.filter(user => user.nameOfCourses.includes(this.course));
  }

}
