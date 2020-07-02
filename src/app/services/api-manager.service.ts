import { Injectable } from '@angular/core';
import axios from 'axios';

export type User = {
  id ?: number,
  name : string,
  email : string,
  courses ?: []
}

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  newUser: User = {name : "", email : ""}


  
  constructor() { }

  public insertUser(newUser:User): Promise<User[]>{
    return axios.post('http://localhost:3000/users', newUser)
    .then(response => response.data)
    .catch(error => console.log(error))
  }

}
