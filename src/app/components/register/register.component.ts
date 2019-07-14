import { Component, OnInit } from '@angular/core';
import { RegisterData } from './register.interface';

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

  constructor() { }

  ngOnInit() {
  }

  save() {
    console.log(this.register);
  }

}
