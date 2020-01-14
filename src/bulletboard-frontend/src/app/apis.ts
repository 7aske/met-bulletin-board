import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class ApiService {

    constructor(private http: HttpClient, private router: Router) {
    }

    // serverURL = "http://127.0.0.1:3000/";
    serverURL = window.location.protocol === "app:" ? "http://127.0.0.1:3000/":`http://${window.location.hostname}:3000/` ;
    // serverURL = "http://192.168.200.225:3000/";

    logout() {
        sessionStorage.removeItem('token');
        this.router.navigate(['']);
    }

    saveSlide(slide) {
        return this.http.post(this.serverURL + "slide", slide, {
            responseType: "json"
        });
    }

    updateSlide(slide) {
        return this.http.put(this.serverURL + "slide", slide, {
            responseType: "json"
        });
    }

    deleteSlide(slide) {
        return this.http.delete(this.serverURL + "slide", { params: new HttpParams().set('slideID', slide['slideID']) });
    }

    savePoll(poll) {
        return this.http.post(this.serverURL + "poll", poll, {
            responseType: "json"
        });
    }

    deletePoll(poll) {
        return this.http.delete(this.serverURL + "poll", { params: new HttpParams().set('questionID', poll['questionID']) });
    }


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
        return this.http.get(this.serverURL + "slide", {
            responseType: "json"
        });
    }

    getAllPolls() {
        return this.http.get(this.serverURL + "poll", {
            responseType: "json"
        });
    }

    callVote(questionID, studentIndex, questionOption) {
      console.log(this.serverURL);
        return this.http.post(this.serverURL + "vote", {
            questionID: questionID,
            studentIndex: studentIndex,
            questionOption: questionOption
        }, {
            responseType: "json",
            headers: new HttpHeaders({
                'key': localStorage.getItem("key")
            })
        });
    }
}
