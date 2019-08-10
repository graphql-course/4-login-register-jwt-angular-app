import { Component, OnInit } from '@angular/core';
import { LoginData, LoginResult } from './login.interface';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MeData } from '../me/me.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginData = {
    email: '',
    password: ''
  };
  sendData: boolean;
  error: boolean;
  show: boolean;
  constructor(private api: ApiService, private router: Router, private auth: AuthService) {
    this.auth.userVar$.subscribe((data: MeData) => {
      if (data === null || data.status === false) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
   }

  ngOnInit() {
    this.auth.start();
  }

  save() {
    this.sendData = true;
    this.show = false;
    this.api.login(this.user.email, this.user.password).subscribe( (result: LoginResult) => {
      if (result.status) {
        this.error = false;
        localStorage.setItem('tokenJWT', result.token);
        console.log('login correcto');
        this.auth.updateStateSession(true);
        this.router.navigate(['/me']);
      } else {
        this.error = true;
        this.show = true;
        this.auth.updateStateSession(false);
        localStorage.removeItem('tokenJWT');
        console.log('login incorrecto');
        this.sendData = false;
      }
    });
  }

}
