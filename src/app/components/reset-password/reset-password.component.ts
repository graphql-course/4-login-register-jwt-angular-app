import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: any = {
    one: '',
    two: ''
  }
  show;
  token;
  id;
  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.token = params['token'];
      console.log(this.id); // (+) converts string 'id' to a number
      console.log(this.token); 
      // In a real app: dispatch action to load the details here.
   });
  }

  ngOnInit() {
    this.show = true;
  }

  change() {
    console.log(this.password);
    this.api.resetPassword(this.id, this.token, this.password.one).subscribe((value => {
      console.log(value);
    }))
  }

}
