import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isNotFalid = false;
  constructor() { }

  ngOnInit() {
  }

  login(username, password) {
    console.log("login", username, password);
    //TODO: call api for login and wait for return token
    let token = "4bce986eef6c454d248334d60cce8167"; // import api here
    // let token;
    if (token) {
      localStorage.setItem("auth-token", token);
    } else {
      this.isNotFalid = true;
      console.error("Access denied!");
    }
  }

}
