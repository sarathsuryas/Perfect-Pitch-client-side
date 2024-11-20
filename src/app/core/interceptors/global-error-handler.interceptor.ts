import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
 
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class GlobalErrorHandlerInterceptor implements HttpInterceptor {
 constructor(private _messageService:MessageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
         if(error.status !== 401) {
           this._messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
         }
        return throwError(error)
      })
    )
  }

 

}
