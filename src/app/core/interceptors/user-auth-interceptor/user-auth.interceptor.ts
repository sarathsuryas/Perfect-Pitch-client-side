import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from 'src/app/features/user/services/user/user.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { removeToken } from 'src/app/store/user/user.action';
import { selctIsBlocked } from 'src/app/store/user/user.selector';
import { MessageService } from 'primeng/api';

@Injectable()
export class UserAuthInterceptor implements HttpInterceptor {
  private isBlocked: boolean = false
  constructor(private readonly _userService: UserService, private readonly _cookieService: CookieService, private readonly _router: Router, private readonly _store: Store, private _messageService: MessageService) {
    this._store.select(selctIsBlocked).subscribe({
      next: (value) => {
        if (value) {
          _messageService.add({ severity: 'error', summary: 'Access Denied', detail: 'Your account is blocked.' });
          this._userService.logOut()
        }
      }
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/admin')) {
      return next.handle(request);
    } else if (request.url.includes('//s3.ap-south-1.amazonaws.com')) {
      return next.handle(request);
    }
    if (!localStorage.getItem('token')) {
      this._store.dispatch(removeToken())
      this._router.navigate([''])
    }


    const token = localStorage.getItem('token')
    const authReq = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    })

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('errror handler inside dnsdk', error.status, '///')
        if (error.status === 401 && localStorage.getItem('token')) {
          return this._userService.refreshToken().pipe(
            switchMap((newToken: string) => {
              console.log('newToken', newToken)
              localStorage.getItem('token')
              localStorage.setItem('token', newToken)
              const retriedReq = request.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              })
              return next.handle(retriedReq)
            })
          )
        } else if (error.status === 403) {

          localStorage.removeItem('token')
          this._store.dispatch(removeToken())
          this._router.navigate([''])
        }
        return throwError(error)
      })
    )
  }
}
