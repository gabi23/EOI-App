import { Injectable } from '@angular/core';
import axios from 'axios';

export type User = {
  id?: number, 
  name: string,
  surname: string,
  email: string,
  phone: number,
  role?: string,
  safeWord?: string,
  courses: number[],
  gitHubLogin: string,
  image?,
  web?
};

export type Course = {
  id?: number, 
  name: string,
  studyField: string,
  description: string,
  image?
};


@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
  urlUsers = "http://localhost:3000/users";
  urlCourses = "http://localhost:3000/courses";
  urlSendMail = "http://localhost:3001/sendmail";
  
  constructor() { }

  sendMessage(user: User) {
    return axios.post(this.urlSendMail, user);
  }

  async getUser(id: number): Promise <User> {
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

  public getCourseByName(name:string): Promise<Course[]>{
    const course = axios.get(`${this.urlCourses}?name=${name}`)
      .then(response => response.data)
      .catch(error => console.log(error));
    return course;
  }

  public getUserByName(name:string): Promise<User[]>{
    const user = axios.get(`${this.urlUsers}?name_like=${name}`)
      .then(response => response.data)
      .catch(error => console.log(error));
    return user;
  }

  public getUsersByCourses(id:number): Promise<User[]>{
    const users = axios.get(`${this.urlUsers}?courses_like=${id}`)
      .then(response => response.data)
      .catch(error => console.log(error));
    return users;
  }
  
  public getUserCourses(ids:number[]): Promise<Course[]>{
    const promises = ids.map( id => axios.get(`${this.urlCourses}/${id}`)
    .then(r => r.data));
    return Promise.all(promises);
  }

  public findEmail(email:string): Promise<User[]>{
    const user = axios.get(`${this.urlUsers}?email=${email}`)
      
      .then(response => response.data)
      .catch(error => console.log(error));
    return user;
  }

  public updateUser(id:number, updatedUser:User): Promise<User[]>{
    const user = axios.patch(`${this.urlUsers}/${id}`, updatedUser)
      .then(response => response.data)
      .catch(error => console.log(error));
    return user;
  }

  // metodo para elimiar a un usuario - actualmente no se comprueba persona
  public async deleteUser(id) {
    return await axios.delete(`${this.urlUsers}/${id}`)
    .then(res => res.data)
    .catch(error => console.log(error))
  }

  public insertUser(newUser:User): Promise<User[]>{
    return axios.post(this.urlUsers, newUser)
    .then(response => response.data)
    .catch(error => console.log(error))
  }

  public insertCourse(newCourse:Course): Promise<Course[]>{
    return axios.post(this.urlCourses, newCourse)
    .then(response => response.data)
    .catch(error => console.log(error))
  }

}
