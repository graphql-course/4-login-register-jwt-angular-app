import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from './user.interface';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MeData } from '../me/me.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor(private api: ApiService, private auth: AuthorizationService) {
    this.auth.start();
    /*if (localStorage.getItem('tokenJWT') !== null ) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status) {
          this.auth.updateBooleanSubject(true);
        }
      });
    } else {
      this.auth.updateBooleanSubject(false);
    }*/
  }

  ngOnInit() {

    this.api.getUsers().subscribe((result: User[]) => {
      this.users = result;
      console.log(this.users);
    });
  }

}
