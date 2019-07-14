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
  error: boolean;
  show: boolean;
  constructor(private api: ApiService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('tokenJWT') !== null ) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status) {
          console.log(result.user);
          this.auth.updateAccess(true);
          this.router.navigate(['/me']);
        }
      });
    } else {
      this.show = true;
    }
  }

  save() {
    console.log(this.user);

    this.api.login(this.user.email, this.user.password).subscribe( (result: LoginResult) => {
      this.show = true;
      if (result.status) {
        this.error = false;
        localStorage.setItem('tokenJWT', result.token);
        console.log('login correcto');
        this.auth.updateAccess(true);
        this.router.navigate(['/me']);
      } else {
        this.error = true;
        this.auth.updateAccess(false);
        localStorage.removeItem('tokenJWT');
        console.log('login incorrecto');
      }
    });
  }

}
