import { Component, OnInit } from '@angular/core';
import { User, Course, ApiManagerService } from '../../services/api-manager.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: Course[] = [];

  constructor(private apiManagerServices: ApiManagerService, private firebaseService: FirebaseService) {
    this.loadCourses();
   }

  ngOnInit(): void {
  }

  loadCourses() {
    this.courses = this.firebaseService.getAllCourses();
  }

}
