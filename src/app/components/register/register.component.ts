import { Component, OnInit } from '@angular/core';
import { MeData } from '../me/me.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RegisterData, RegisterResult } from './register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: RegisterData = {
    name: '',
    lastname: '',
    email: '',
    password: ''
  };
  resultOperation: number;
  message: string;
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

  save() {
    console.log(this.register);
    this.api.addUser(this.register).subscribe(({ data }) => {
      this.resultOperation = 1;
      const userResult: RegisterResult = data.register;
      this.message = `Usuario ${userResult.user.name} ${userResult.user.lastname} registrado`;
    }, (error) => {
      this.resultOperation = 2;
      console.log('error enviando la query', error);
      this.message = 'Error inesperado en el registro. Prueba de nuevo.';
    });
  }

}
