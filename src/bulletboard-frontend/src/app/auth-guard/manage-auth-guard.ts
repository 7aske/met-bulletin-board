import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../apis';

@Injectable({
    providedIn: 'root'
})
export class ManageAuthGuard implements CanActivate {

    constructor(private router: Router, private api: ApiService) { }

    async canActivate() {
        return true;
        console.log("called");
        if (this.api.authUserToken != null && this.api.authUserToken !== "" && await this.api.isLoginValid()) {
            console.log("hit");
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }


}