import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MeData } from './me.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  user: any;
  constructor(private router: Router, private auth: AuthService) {
    this.auth.userVar$.subscribe((data: MeData) => {
      if (data !== null && data !== undefined) {
        this.user = data.user;
      }
    });
   }

  ngOnInit() {
    // Tenemos token
    this.auth.start();
  }

  logout() {
    this.auth.logout();
  }

}
