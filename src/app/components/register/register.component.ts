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
  message: string;
  operation: number;
  register: RegisterData = {
    name: '',
    lastname: '',
    email: '',
    password: ''
  };
  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.start();
  }

  save() {
    console.log(this.register);
    this.api.addUser(this.register).subscribe((result) => {
      const userResult: RegisterResult = result.data.register;
      this.operation = 1;
      this.message = `Usuario ${ userResult.user.name} ${ userResult.user.lastname} correctamente añadido`;
      console.log(result);
    }, (error: any) => {
      console.log(error);
      this.operation = 2;
      this.message = 'Error inesperado en el registro, prueba de nuevo';
    });
  }

}
