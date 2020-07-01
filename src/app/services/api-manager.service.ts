import { Injectable } from '@angular/core';
import axios from 'axios';

export type User = { 
  name: string, 
  email: string, 
  type: string, 
  safeWord: string,  
  courses: string []
};

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  url = "http://localhost:3000/users";

  constructor() { }

  getAllUsers(): Promise<User[]> {
    const users = axios.get(this.url)
                    .then(response => response.data)
                    .catch(error => console.log(error));
    return users;
  }


}
