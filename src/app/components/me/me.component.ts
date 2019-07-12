import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MeData } from './me.interface';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  user: any;
  constructor(private auth: AuthorizationService) { }

  ngOnInit() {
    // Tenemos token
    if (localStorage.getItem('tokenJWT') !== null) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status) {
          console.log(result.user);
          this.user = result.user;
        } else {
          console.log('token no valido');
          this.logout();
        }
      });
    } else { // No hay token
      this.logout();
    }
  }

  logout() {
    this.auth.updateBooleanSubject(false);
  }

}
