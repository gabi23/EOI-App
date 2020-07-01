import { Component, OnInit } from '@angular/core';
import { User, ApiManagerService } from '../../services/api-manager.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private apiManagerServices: ApiManagerService) {
    this.loadUsers();
  }

  ngOnInit(): void { }

  async loadUsers(): Promise<void> {
    /* const id = this.route.snapshot.paramMap.get('id'); */
    const users = await this.apiManagerServices.getAllUsers();
    this.users = users;
    console.log(this.users);
  }

}
