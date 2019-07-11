import { Me } from './../../interfaces/me.interface';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  user: any;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.getMe().subscribe(
      (result: Me) => {
        console.log(result);
        if (result.status) {
          console.log(result.message);
          this.user = result.user;
        } else {
          localStorage.removeItem('tokenJWT');
          console.log(result.message);
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('tokenJWT');
    this.router.navigate(['/login']);
  }

}
