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

  constructor(private api: ApiService) { }

  ngOnInit() {

    this.api.getUsers().subscribe((result) => {
        console.log(result);
      });
  }
}
