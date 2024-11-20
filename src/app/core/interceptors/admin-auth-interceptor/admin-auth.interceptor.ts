import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/features/admin/services/admin.service';
import { Store } from '@ngrx/store';
import { removeToken } from 'src/app/store/admin/admin.action';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {

  constructor(private _cookieService:CookieService,private _router:Router,private _adminService:AdminService,private readonly _store:Store) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    
    if(!request.url.includes('/admin')) {
      return next.handle(request)
      }
    const token  = this._cookieService.get('adminToken')
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
    })
    return next.handle(authReq).pipe(
      catchError((error:HttpErrorResponse)=>{

        if(error.status === 401) {
              return this._adminService.refreshToken().pipe(
                switchMap((newToken:string)=>{
                  this._cookieService.remove('adminToken')
                   this._cookieService.put('adminToken',newToken)
                  const retriedReq = request.clone ({
                    setHeaders:{Authorization:`Bearer ${newToken}`}
                  })
                  return next.handle(retriedReq)
                })
              )
        } else if (error.status === 403) {
          this._cookieService.remove('adminToken')
          console.log('token expired')
           this._store.dispatch(removeToken())
           this._router.navigate(['admin'])
        }
        return throwError(error)
      })
    )
  


}
}
