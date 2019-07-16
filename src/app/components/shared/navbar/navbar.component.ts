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
    this.auth.accessVar$.subscribe((data: boolean) => {
      console.log('session state', data);

      if ( data === false && this.access) {
        this.access = false;
        this.logout();
      } else {
        this.access = data;
      }
    });
  }

  logout() {
    console.log('logout!!');
    this.auth.logout();
  }

  ngOnInit() {
    this.auth.start();
  }

}
