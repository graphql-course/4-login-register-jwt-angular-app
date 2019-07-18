import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from './user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MeData } from '../me/me.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.start();
    this.api.getUsers().subscribe((result: User[]) => {
      this.users = result;
      console.log(this.users);
    });
  }

}
