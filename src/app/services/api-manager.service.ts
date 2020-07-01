import { Injectable } from '@angular/core';
import axios from 'axios';
import { ResourceLoader } from '@angular/compiler';

export type User = {
  id?: number, 
  name : string,
  email : string,
  type : string
};

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
url = "http://localhost:3000/users"
  constructor() { }

  public getUser(id : number) : Promise <User> {
    return axios.get(`${this.url}/${id}`)
      .then( res => res.data)
    
  }
}
