import { Me } from './../../interfaces/me.interface';
import { Login } from './../../interfaces/login.interface';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

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
  show = false;
  error: boolean;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('tokenJWT') !== null) {
      this.api.getMe().subscribe(
        (result: Me) => {
          console.log(result);
          if (result.status) {
            console.log(result.message);
            this.router.navigate(['/me']);
          } else {
            this.show = true;
            localStorage.removeItem('tokenJWT');
            console.log(result.message);
          }
        }
      );
    } else {
      this.show = true;
    }
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
          this.router.navigate(['/me']);
        } else {
          console.log(result.message);
          this.error = true;
          localStorage.removeItem('tokenJWT');
        }
      }
    );
  }

}
