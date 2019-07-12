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
    this.auth.accessVar$.subscribe( data => {
      console.log('header', data);
      this.access = data;
      if (data === false) {
        localStorage.removeItem('tokenJWT');
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.auth.getMe().subscribe((result: MeData) => {
      if (result.status) {
        this.access = true;
      } else {
        this.access = false;
      }
      console.log(this.access);
    });
  }

  logout() {
    this.access = false;
  }

}
