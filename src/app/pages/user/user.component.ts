import { Component, OnInit } from '@angular/core';
import { ApiManagerService, User } from '../../services/api-manager.service';
import { ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = {};

  constructor( private apiManager : ApiManagerService, private route: ActivatedRoute ) { 
    this.loadUser();

  }


  ngOnInit(): void {
  }

  loadUser ()  {
    this.apiManager.getUser(Number(this.route.snapshot.paramMap.get("id")))
      .then((user) => {
        this.user = user;
       }).catch((err) => {
         console.log (err);
      });
  }



}
