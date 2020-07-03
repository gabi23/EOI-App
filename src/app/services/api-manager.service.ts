import { Injectable } from '@angular/core';
import axios from 'axios';

export type User = {
  id?: number, 
  name: string,
  surname: string,
  email: string,
  phone?: number,
  role: string,
  safeWord?: string,  // A falta de generar la "pass" al registrar
  courses?: number[],
  nameOfCourses?: string[],  // Quitar mas adelante
  gitHubLogin? : string
};

export type Course = {
  id: number, 
  name: string,
  studyField: string, // Posiblemente comprobar cambios más adelante
  description: string
};



@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
  urlUsers = "http://localhost:3000/users"
  urlCourses = "http://localhost:3000/courses"
  
  constructor() { }

  async getUser(id : number) : Promise <User> {
    return await axios.get(`${this.urlUsers}/${id}`)
      .then( res => res.data)
    
  }

  public getAllUsers(): Promise<User[]> {
    const users = axios.get(this.urlUsers)
                    .then(response => response.data)
                    .catch(error => console.log(error));
    return users;
  }

  public getCourses(): Promise<Course[]>{
    const courses = axios.get(this.urlCourses)
                      .then(response => response.data)
                      .catch(error => console.log(error));
    return courses;
  }
  
  public getUserCourses( ids : number []): Promise<Course[]>{
    const promises = ids.map( id => axios.get(`${this.urlCourses}/${id}`)
    .then(r => r.data));
    return Promise.all(promises);
  }

  public insertUser(newUser:User): Promise<User[]>{
    return axios.post('http://localhost:3000/users', newUser)
    .then(response => response.data)
    .catch(error => console.log(error))
  }


}
