import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { meData, login, getUsers } from './operations/query';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'loginRegisterJWT';

  constructor(private apollo: Apollo, private api: ApiService) { }

  ngOnInit() {

    this.api.getUsers().subscribe((result) => {
        console.log(result);
      });

    this.api.login('mugan86@gmail.com', '1234').subscribe((result) => {
        console.log(result);
      });

    this.api.getMe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkMjBkYzZlNjBhNmQwMDQ5Zjc3YTQyYSIsIm5hbWUiOiJBbmFydHoiLCJsYXN0bmFtZSI6Ik11Z2lrYSBMZWRvIiwiZW1haWwiOiJtdWdhbjg2QGdtYWlsLmNvbSIsImlkIjoyLCJyZWdpc3RlckRhdGUiOiIyMDE5LTA3LTA2IDE5OjM3OjUwIn0sImlhdCI6MTU2Mjc3MzI5MywiZXhwIjoxNTYyODU5NjkzfQ.oEJWsskyLDl73u5xi1pJ5mPypOT-IHZeBeYTNkkebkU").subscribe((result) => {
      console.log(result);
    });
  }
}
