import { Component, OnInit } from '@angular/core';
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

    this.auth.start();
    // Tenemos token
    this.auth.getMe().subscribe((result: MeData) => {
      if (result.status) {
        this.user = result.user;
        this.auth.updateBooleanSubject(true);
      } else {
        console.log('token no valido');
        // this.auth.updateBooleanSubject(false);
        // this.logout();
      }
    });
  }

  logout() {
    this.auth.logout();
  }

}
