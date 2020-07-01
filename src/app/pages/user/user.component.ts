import { Component, OnInit } from '@angular/core';
import { ApiManagerService, User, Course } from '../../services/api-manager.service';
import { GitHubApiService } from '../../services/git-hub-api.service'
import { ActivatedRoute, Params } from '@angular/router';





@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = {}; 
  courses : Course []; 
  repos : any[];

  constructor( private apiManager : ApiManagerService, private route: ActivatedRoute, private gitHubApiManager : GitHubApiService ) { 
    this.loadUser();
  


  }


  ngOnInit(): void {
  }

  loadUser ()  {
    this.apiManager.getUser(Number(this.route.snapshot.paramMap.get("id")))
      .then((user) => {
        this.user = user;
        this.loadUserCourses(user.courses)
        this.loadUserRepositories(user.gitHubLogin)
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

  loadUserRepositories (gitHubLogin : string){
    this.gitHubApiManager.getUserRepos(gitHubLogin)
      .then((repos) => {
        this.repos = repos;
        
      }).catch((err) => {
        console.log (err);
        
      });
  }



}
