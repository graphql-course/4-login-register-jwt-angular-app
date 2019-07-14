import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MeData } from '../../me/me.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  access: boolean;
  constructor(private auth: AuthorizationService, private router: Router) {
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
      });
    }
  }

  logout() {
    this.access = false;
    localStorage.removeItem('tokenJWT');
    const currentRouter = this.router.url;
    if (currentRouter !== '/users' && currentRouter !== '/register') {
      this.router.navigate(['/login']);
    }
  }

}
