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
    if (this.api.requestLoginToken(username, password)) {
      this.isNotFalid = false;
    } else {
      this.isNotFalid = true;
      console.error("Access denied!");
    }
  }

}
