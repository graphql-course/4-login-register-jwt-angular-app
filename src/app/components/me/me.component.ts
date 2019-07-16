import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MeData } from './me.interface';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../users/user.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  user: User;
  constructor(private router: Router, private auth: AuthService) {
    this.auth.userVar$.subscribe((data: MeData) => {
      if (data !== null && data !== undefined) {
        this.user = data.user;
      }
    });
  }

  ngOnInit() {
    this.auth.start();
  }

  logout() {
    this.auth.logout();
  }

}
