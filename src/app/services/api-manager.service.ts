import { Injectable } from '@angular/core';
import axios from 'axios';

export type User = {
  id?: number, 
  name : string,
  email : string,
  type : string,
  safeWord?: string,  
  courses?: string []
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


  getAllUsers(): Promise<User[]> {
    const users = axios.get(this.url)
                    .then(response => response.data)
                    .catch(error => console.log(error));
    return users;
  }


}
