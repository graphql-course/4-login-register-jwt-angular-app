import { LoginData, LoginResult } from './login.interface';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = false;
  user: LoginData = {
    email: '',
    password: ''
  };
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  save() {
    console.log(this.user);
    this.api.login(this.user.email, this.user.password).subscribe((result: LoginResult) => {
      if (result.status) {
        console.log(result.message);
        this.error = false;
      } else {
        console.log(result.message);
        this.error = true;
      }
    });
  }

}
