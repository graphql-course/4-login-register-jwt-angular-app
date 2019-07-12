import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { TOKEN_JWT } from 'src/app/app.constants';
import { Me } from './me.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem(TOKEN_JWT) !== null) {
      this.api.getMe().subscribe((result: Me) => {
        if (result.status) {
          console.log(result.user);
        } else {
          console.log(result.message);
          localStorage.removeItem(TOKEN_JWT);
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

}
