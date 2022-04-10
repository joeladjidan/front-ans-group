import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoaderService} from '../../composants/loader/service/loader.service';
import {AuthenticationResponse} from '../../../gs-api/src/models/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  http: any;
  token: any;
  constructor(
    private loaderService: LoaderService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    let authenticationResponse: AuthenticationResponse = {};

    if (localStorage.getItem('accessToken')) {
      authenticationResponse = JSON.parse(
        localStorage.getItem('accessToken') as string
      );
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + authenticationResponse.accessToken
        })
      });
      return this.handleRequest(authReq, next);
    }

    this.token = localStorage.getItem('api-token');
    if (this.token) {
      req = req.clone({
        setHeaders: {
          'api-token': this.token
        }
      });
    }
    return this.handleRequest(req, next);
  }

  handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loaderService.hide();
        }
      }, (err: any) => {
        this.loaderService.hide();
        console.log(err);
        if (err.status === 401) {
            if (err.error.message === 'Token is expire') {
              const params = {
                token: this.token,
                refreshToken: localStorage.getItem('refreshToken')  as string
              };
              return this.http.post('localhost:8080/auth/refresh', params).flatMap(
                (data: any) => {

                }
              );
            } else {
            }
        }
        if (err.status === 403) {
            return this.router.navigate(['login']);
        }
     }));
  }
}
