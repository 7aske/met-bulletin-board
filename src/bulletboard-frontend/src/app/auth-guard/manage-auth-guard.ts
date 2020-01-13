import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../apis';

@Injectable({
    providedIn: 'root'
})
export class ManageAuthGuard implements CanActivate {

    valid: boolean = false;
    constructor(private router: Router, private api: ApiService) {

    }

    canActivate(): any {
        this.api.isLoginValid().subscribe(data => {
            console.log(data);
            return true;
        }, err => {
            this.router.navigate(['login']);
            return false;
        });
        return true;
    }


}