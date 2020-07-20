import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm){
    if(form.value.email === 'admin@admin.com' && form.value.password === 'admin1234'){
      localStorage.setItem('email', form.value.email);
      this.router.navigate(['/users']); 
    }
    }
}