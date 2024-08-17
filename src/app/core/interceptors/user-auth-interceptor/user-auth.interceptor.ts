import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from 'src/app/features/user/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class UserAuthInterceptor implements HttpInterceptor {

  constructor(private readonly _userService:UserService,private readonly _cookieService:CookieService,private readonly _router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('/admin')) {
      return next.handle(request);
      
    }
    console.log('////////////////////////////////////////////////////////////////')
    const token = this._cookieService.get('token')
    const authReq = request.clone({
      setHeaders:{Authorization:`Bearer ${token}`}
    })
   
    return next.handle(authReq).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error.status === 401) {
          return this._userService.refreshToken().pipe(
           switchMap((newToken:string)=>{
            this._cookieService.delete('token')
            this._cookieService.set('token',newToken)
            const retriedReq  = request.clone({
              setHeaders:{Authorization:`Bearer ${newToken}`}
            })
            return next.handle(retriedReq)
           })
          )
        } else if (error.status === 403) {
          this._cookieService.delete('token')
         this._router.navigate([''])
        }
        return throwError(error)
      })
    )
  }
}
