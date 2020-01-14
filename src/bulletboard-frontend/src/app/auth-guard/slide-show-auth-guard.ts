import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../apis';

@Injectable({
    providedIn: 'root'
})
export class SlideShowAuthGuard implements CanActivate {

    constructor(private router: Router, private api: ApiService) { }

    canActivate() {
      console.log("heree");
      return true;
        // return (window.location.href.startsWith("http://localhost") || window.location.href.startsWith("https://localhost"));
        return (window.location.protocol === "app:");
    }
}
