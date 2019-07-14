import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MeData } from '../../me/me.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  access: boolean = false;
  constructor(private auth: AuthService) {

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
   }
 }


}
