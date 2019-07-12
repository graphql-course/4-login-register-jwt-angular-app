import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MeData } from './me.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  user: any;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    // Tenemos token
    if (localStorage.getItem('tokenJWT') !== null ) {
      this.api.getMe().subscribe((result: MeData) => {
        if (result.status) {
          console.log(result.user);
          this.user = result.user;
        } else {
          console.log('token no valido');
          localStorage.removeItem('tokenJWT');
          this.logout();
        }
      });
    } else { // No hay token
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('tokenJWT');
    this.router.navigate(['/login']);
  }

}
