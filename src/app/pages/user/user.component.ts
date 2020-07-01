import { Component, OnInit } from '@angular/core';
import { ApiManagerService, User, Course } from '../../services/api-manager.service';
import { ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user : User; 
  courses : Course []; 

  constructor( private apiManager : ApiManagerService, private route: ActivatedRoute ) { 
    this.loadUser();
  


  }


  ngOnInit(): void {
  }

  loadUser ()  {
    this.apiManager.getUser(Number(this.route.snapshot.paramMap.get("id")))
      .then((user) => {
        this.user = user;
        this.loadUserCourses(user.courses)
       }).catch((err) => {
         console.log (err);
      });
  }

  loadUserCourses (ids : number []){
    this.apiManager.getUserCourses(ids)
      .then((courses) => {
        this.courses = courses;
      }).catch((err) => {
        console.log (err);
     });
  }



}
