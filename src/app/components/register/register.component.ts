import { Component, OnInit } from '@angular/core';
import { MeData } from '../me/me.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private api: ApiService, private auth: AuthorizationService) {
    if (localStorage.getItem('tokenJWT') !== null ) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status) {
          this.auth.updateBooleanSubject(true);
        }
      });
    } else {
      this.auth.updateBooleanSubject(false);
    }
  }

  ngOnInit() {
  }

}
