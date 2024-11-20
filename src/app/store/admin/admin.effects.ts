import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CookieService } from "ngx-cookie";
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, debounceTime, exhaustMap, map, of, tap } from "rxjs";
import { adminLogin, adminLoginFail, adminLoginSuccess, adminLogout, getUsersFail, getUsersSuccess, removeToken, searchUser, setAdminTokenCookie, setTokenAdmin } from "./admin.action";
import { AdminService } from "src/app/features/admin/services/admin.service";

@Injectable({ providedIn: 'root' })
export class AdminEffects {
  
  constructor(private _actions$: Actions,
    private _cookieService: CookieService,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    private _adminService:AdminService
  ) {}


  $login = createEffect(()=>
    this._actions$.pipe(
     ofType(adminLogin),
     tap(() =>this._spinner.show()),
     exhaustMap(action=>
       this._adminService.login(action.email,action.password).pipe(
         tap(data=>  {this._cookieService.put('adminToken',data.accessToken)
         
         }),
         map((admin)=>adminLoginSuccess({adminData:admin.adminData,token:admin.accessToken})),
         tap((data)=>{
           
            if(data) {
               this._spinner.hide()
              
               this._router.navigate(['/admin/home'])
            }
           }),
         catchError(error=>of(adminLoginFail({error:error.error.message})).pipe(
           tap((data)=>{
           
             if(data) {
                this._spinner.hide()
             }
            })
         )
       )
       )
     )
    )
  )
   
  


  setTokenFromCookie$ = createEffect(()=>
      this._actions$.pipe(
        ofType(setAdminTokenCookie),
        map(() => {
          const token = this._cookieService.get('adminToken') as string; 
          return setTokenAdmin({ token });
        })
      )
  )

 searchUser$ = createEffect(()=>
 this._actions$.pipe(
  ofType(searchUser),
  debounceTime(1000),
  exhaustMap(action=>
    this._adminService.getUsersData(action.search).pipe(
      map(user=>getUsersSuccess({users:user})),
      catchError(error=>of(getUsersFail(error)))
    )
  )
 )
) 

}