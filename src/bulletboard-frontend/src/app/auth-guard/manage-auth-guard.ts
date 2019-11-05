import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ManageAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        let token = localStorage.getItem("auth-token");
        let access = true; // send verification acess to backend
        if (token != null && token !== "" && access) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }


}