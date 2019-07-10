import { Login } from './../../interfaces/login.interface';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    email: '',
    password: ''
  };

  error: boolean;
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  save() {
    console.log(this.user);
    this.api.login(this.user.email, this.user.password).subscribe(
      (result: Login) => {
        console.log(result);
        if (result.status === true) {
          console.log('Login correct');
          this.error = false;
          localStorage.setItem('tokenJWT', result.token);
        } else {
          console.log(result.message);
          this.error = true;
          localStorage.removeItem('tokenJWT');
        }
      }
    );
  }

}
