import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GitHubApiService {
  urlUsers   = "https://api.github.com/users"
  urlDetails = "https://api.github.com/repos"
 

  constructor() { }

  public getUserRepos( gitHubLogin : string) : Promise <any[]> {
    return axios.get(`${this.urlUsers}/${gitHubLogin}/repos`)
      .then(r =>{
        console.log(`${this.urlUsers}/${gitHubLogin}/repos`)
        return r.data
      } )
  }

  public getRepositoriesLanguages ( gitHubLogin: string, repositoriesNames: string[]){
    const promises = repositoriesNames.map (repositoryName => axios.get(`${this.urlDetails}/${gitHubLogin}/${repositoryName}/languages`).then (r => Object.keys(r.data)) )
    return Promise.all(promises)
    
  }

}
