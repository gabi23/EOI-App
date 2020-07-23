import { Component, OnInit } from '@angular/core';
import { GitHubApiService } from '../../services/git-hub-api.service'
import { ActivatedRoute, Params } from '@angular/router';
import { User, Course, FirebaseService } from '../../services/firebase.service';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],

})
export class UserComponent implements OnInit {
  user : User; 
  courses : Course []; 
  repos : any[];

  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute, private gitHubApiManager : GitHubApiService) { 
    this.loadUser();
  }


  ngOnInit(): void {
  }

  async loadUser() {
    this.user = await this.firebaseService.getUser(this.route.snapshot.paramMap.get("id"));
    this.loadUserCourses(this.user.courses);
    this.loadUserRepositories(this.user.gitHubLogin);
  }

  async loadUserCourses (ids : number []){
    this.courses = await this.firebaseService.getUserCourses(ids);
  }

  loadUserRepositories (gitHubLogin : string){
    this.gitHubApiManager.getUserRepos(gitHubLogin)
      .then((repos) => {
        this.repos = repos;
        let reposNames = repos.map(repo => repo.name)
        this.loadRepositoriesLanguages(gitHubLogin, reposNames);
        
      }).catch((err) => {
        console.log (err);
        
      });
  }

  loadRepositoriesLanguages (gitHubLogin: string, repositoriesNames: string[]){
    this.gitHubApiManager.getRepositoriesLanguages(gitHubLogin, repositoriesNames)
      .then((repositoriesLanguages) => {
        repositoriesLanguages.forEach( (repositorylanguages, index) => {
          this.repos[index].languages = repositorylanguages 
        }); 
      })
    
  }

 


}
