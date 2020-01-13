import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor() {
    }
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     const token = sessionStorage.getItem("token");

    //     const authReq = req.clone({
    //         headers: new HttpHeaders({
    //             'Authorization': token
    //         })
    //     });
    //     return next.handle(authReq);
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = sessionStorage.getItem("token");

        request = request.clone({
            headers: request.headers.set('Authorization', token ? token : "")
        });
        return next.handle(request);
    }
}