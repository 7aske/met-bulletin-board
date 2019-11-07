import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apis';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isNotFalid = false;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  login(username, password) {
    // console.log("login", username, password);
    // this.api.requestLoginToken(username, password);
    this.api.requestLoginToken(username, password).then(res => {
      this.isNotFalid = false;
      this.router.navigate(['manage']);
      console.log(this.router);
    }).catch(err => {
      this.isNotFalid = true;
      console.error("Access denied!");
    });

    // if (this.api.) {
    // this.isNotFalid = false;
    // this.router.navigate(['manage']);
    // } else {/
    // this.isNotFalid = true;
    // console.error("Access denied!");
    // }
  }

}
