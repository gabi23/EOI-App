import { Injectable } from '@angular/core';
import axios from 'axios';

export type User = {
  id?: number, 
  name: string,
  surname: string,
  email: string,
  phone?: string,
  role: string,
  safeWord?: string,  // A falta de generar la "pass" al registrar
  courses?: number[],
  gitHubLogin? : string
};

export type Course = {
  id?: number, 
  name: string,
  studyField: string, // Posiblemente comprobar cambios más adelante
  description: string
};

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  newUser: User = {name : "", 
  surname : "", 
  email : "",
  role : "" }

  newCourse: Course = {
    name: "",
    studyField: "",
    description: ""
  }

  
  constructor() { }

  public insertUser(newUser:User): Promise<User[]>{
    return axios.post('http://localhost:3000/users', newUser)
    .then(response => response.data)
    .catch(error => console.log(error))
  }

}
