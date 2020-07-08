import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GitHubApiService {
  url = "https://api.github.com/users"

  constructor() { }

  public getUserRepos( gitHubLogin : string) : Promise <any[]> {
    return axios.get(`${this.url}/${gitHubLogin}/repos`)
      .then(r =>{
        console.log(`${this.url}/${gitHubLogin}/repos`)
        return r.data
      } )
  }
}
