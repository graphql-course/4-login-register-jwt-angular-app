import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from './user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;
  constructor(private api: ApiService) { }

  ngOnInit() {

    this.api.getUsers().subscribe((result: User[]) => {
      this.users = result;
      console.log(this.users);
    });
  }

}
