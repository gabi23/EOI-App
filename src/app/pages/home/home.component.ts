import { Component, OnInit } from '@angular/core';
import { User, Course, ApiManagerService } from '../../services/api-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: Course[] = [];

  constructor(private apiManagerServices: ApiManagerService) {
    this.loadCourses();
   }

  ngOnInit(): void {
  }

  async loadCourses(): Promise<void> {
    this.courses = await this.apiManagerServices.getCourses();
    console.log(this.courses);
  }

}
