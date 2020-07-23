import { Component, OnInit } from '@angular/core';
import { FirebaseService, Course } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: Course[] = [];

  constructor(private firebaseService: FirebaseService) {
    this.loadCourses();
   }

  ngOnInit(): void {
  }

  async loadCourses() {
    this.courses = await this.firebaseService.getAllCourses();
  }

}
