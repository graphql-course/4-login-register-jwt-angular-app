import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MeData } from '../me/me.interface';
import { RegisterData, RegisterResult } from './register.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  operation: number;
  message: string;
  register: RegisterData = {
    name: '',
    lastname: '',
    email: '',
    password: ''
  };
  constructor(private auth: AuthService, private api: ApiService) { }

  ngOnInit() {
    /*if (localStorage.getItem('tokenJWT') !== null ) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status) {
          this.auth.updateStateSession(true);
        } else {
          this.auth.updateStateSession(false);
        }
      });
    } else {
      this.auth.updateStateSession(false);
    }*/
    this.auth.start();
  }

  save() {
    console.log(this.register);

    this.api.register(this.register).subscribe(({data}) => {
      console.log(data);
      const userResult: RegisterResult = data.register;
      if (userResult.status) {
        this.operation = 1;
      } else {
        this.operation = 2;
      }
      this.message = userResult.message;

    }, (error) => {
      console.log('error enviando el query: ', error);
      this.operation = 3;
      this.message = 'Error inesperado';
    });
  }

}
