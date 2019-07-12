import { LoginData, LoginResult } from './login.interface';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_JWT } from 'src/app/app.constants';
import { Me } from '../me/me.interface';

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
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem(TOKEN_JWT) !== null) {
      this.api.getMe().subscribe((result: Me) => {
        if (result.status) {
          console.log(result.user);
          this.router.navigate(['/me']);
        } else {
          console.log(result.message);
          localStorage.removeItem(TOKEN_JWT);
        }
      });
    }
  }

  save() {
    console.log(this.user);
    this.api.login(this.user.email, this.user.password).subscribe((result: LoginResult) => {
      if (result.status) {
        console.log(result.message);
        this.error = false;
        localStorage.setItem(TOKEN_JWT, result.token);
        this.router.navigate(['/me']);
      } else {
        console.log(result.message);
        this.error = true;
        localStorage.removeItem(TOKEN_JWT);
      }
    });
  }

}
