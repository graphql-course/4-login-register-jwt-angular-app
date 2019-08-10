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
  complete: boolean;
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
    this.auth.start();
  }

  save() {
    this.complete = true;
    this.api.register(this.register).subscribe(({data}) => {
      const userResult: RegisterResult = data.register;
      if (userResult.status) {
        this.operation = 1;
      } else {
        this.operation = 2;
      }
      this.message = userResult.message;
      this.complete = false;

    }, (error) => {
      console.log('error enviando el query: ', error);
      this.operation = 3;
      this.message = 'Error inesperado';
      this.complete = false;
    });
  }

}
