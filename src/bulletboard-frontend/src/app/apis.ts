import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class ApiService {
    constructor(private http: HttpClient, private router: Router) {
    }

    // serverURL = "localhost:3000";
    serverURL = "http://7aske.xyz:3000/";

    async requestLoginToken(username, password) {
        let cred = {
            mbb_username: username,
            mbb_password: password
        }

        this.http.post(this.serverURL + "auth/login", cred, {
            responseType: "json",
            observe: 'body'
        }).subscribe(data => {
            console.log(data);
            sessionStorage.setItem("token", data['token']);
            if (data["status"] === 'OK') {
                this.router.navigate(['manage']);
                return true;
            }
        }, err => {
            if (err['status'] === 401) {
                return false;
            }
        });
        return false;
    }

    isLoginValid(): Observable<boolean> {
        return new Observable(observer => {
            this.http.post(this.serverURL + "auth/validate", {}, {
                responseType: "json"
            }).subscribe(data => {
                if (data["status"] === 'OK') {
                    observer.next(true);
                    observer.complete();
                }
            }, err => {
                observer.error(false);
                observer.complete();
            });
        });
    }

    getAllSlides() {
        return this.http.post(this.serverURL + "slides", {}, {
            responseType: "json"
        });
    }


}