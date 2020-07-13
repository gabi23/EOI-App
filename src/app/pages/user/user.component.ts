import { Component, OnInit } from '@angular/core';
import { ApiManagerService, User, Course } from '../../services/api-manager.service';
import { GitHubApiService } from '../../services/git-hub-api.service'
import { ActivatedRoute, Params } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';






@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UserComponent implements OnInit {
  user : User; 
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

  languageImageError(event){
    let imgElement = event.target
    let substituteElement = document.createElement("div")
    substituteElement.appendChild(document.createTextNode( imgElement.getAttribute('alt')))
    substituteElement.classList.add("language-text")
    imgElement.parentNode.insertBefore( substituteElement, imgElement );
    imgElement.parentNode.removeChild( imgElement);

  }


}
