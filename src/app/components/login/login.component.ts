import { Component, OnInit } from '@angular/core';
import { LoginData, LoginResult } from './login.interface';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MeData } from '../me/me.interface';
import { AuthorizationService } from 'src/app/services/authorization.service';

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
  error: boolean;
  show: boolean;
  constructor(private api: ApiService, private auth: AuthorizationService,
              private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('tokenJWT') !== null ) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status) {
          this.auth.updateBooleanSubject(true);
          this.router.navigate(['/me']);
        }
      });
    } else {
      this.show = true;
      this.auth.updateBooleanSubject(false);
    }
  }

  save() {
    this.api.login(this.user.email, this.user.password).subscribe( (result: LoginResult) => {
      this.show = true;
      if (result.status) {
        this.error = false;
        localStorage.setItem('tokenJWT', result.token);
        console.log('login correcto');
        this.auth.updateBooleanSubject(true);
        this.router.navigate(['/me']);
      } else {
        this.error = true;
        localStorage.removeItem('tokenJWT');
        this.auth.updateBooleanSubject(false);
        console.log('login incorrecto');
      }
    });
  }

}
