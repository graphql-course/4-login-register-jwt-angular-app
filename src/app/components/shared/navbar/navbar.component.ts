import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MeData } from '../../me/me.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  access: boolean;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.accessVar$.subscribe(data => {
      console.log('Session state', data);
      this.access = data;
      if (data === false) {
        this.logout();
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('loginJWT') !== null) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status) {
          this.access = true;
        } else {
          this.access = false;
        }
        console.log(this.access);
      });
    } else {
      console.log('session', false);
    }
  }

  logout() {
    localStorage.removeItem('tokenJWT');
    this.access = false;
    const currentRouter = this.router.url;
    if (currentRouter !== '/users' && currentRouter !== '/register') {
      this.router.navigate(['/login']);
    }
  }


}
