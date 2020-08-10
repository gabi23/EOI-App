import { Injectable } from '@angular/core';
import axios from 'axios';

export type User = {
  id?: string, 
  name: string,
  surname: string,
  email: string,
  phone: number,
  role?: string,
  safeWord?: string,
  courses: string[],
  gitHubLogin: string,
  image?,
  web?
};

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
  urlSendMail = "http://localhost:3001/sendmail";
  
  constructor() { }

  sendMessage(user: User) {
    return axios.post(this.urlSendMail, user);
  }

}
