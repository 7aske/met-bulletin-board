import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    constructor(private http: HttpClient) { }

    // serverURL = "localhost:3000";
    serverURL = "http://192.168.18.101:3000";
    authPanelToken = "43D7498EDE4711B6DABD54A5E1F5CBD353455BDE1D871F3ED8CBD67207691CC7";
    authUserToken = "";

    async requestLoginToken(username, password): Promise<boolean> {
        let cred = {
            mbb_username: username,
            mbb_password: password
        }
        return new Promise((resolve, reject) => {
            this.http.post(this.serverURL + "/auth/login", cred, {
                responseType: "json",
                observe: 'body'
            }).subscribe(data => {
                console.log(data);
                this.authUserToken = data['token'];
                if (data["status"] === 'OK') {
                    resolve(true);
                }
            }, err => {
                if (err['status'] === 401) {
                    reject(false);
                }
            });
        })
    }

    async isLoginValid(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.post(this.serverURL + "/auth/validate", { token: this.authUserToken }, {
                responseType: "json"
            }).subscribe(data => {
                if (data["status"] === 'OK') {
                    resolve(true);
                }
            }, err => {
                reject(false);
            });

        });
    }
}