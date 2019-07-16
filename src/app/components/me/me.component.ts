import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MeData } from './me.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  user: any;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    // Tenemos token
    if (localStorage.getItem('tokenJWT') !== null ) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status) {
          console.log(result.user);
          this.user = result.user;
          this.auth.updateStateSession(true);
        } else {
          console.log('token no valido');
          this.auth.updateStateSession(false);
          this.logout();
        }
      });
    } else { // No hay token
      this.logout();
    }
  }

  logout() {
    this.auth.updateStateSession(false);
    localStorage.removeItem('tokenJWT');
    this.router.navigate(['/login']);
  }

}
