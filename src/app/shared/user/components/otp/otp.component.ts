import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { verifyOtp } from 'src/app/store/user/user.action';
import { userModel } from 'src/app/store/user/user.model';
import { selectOtpVerificationFail, selectUserSuccess } from 'src/app/store/user/user.selector';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  otp = ''

  constructor(private readonly _fb: FormBuilder, 
   private _store:Store<UserState>, private _router:Router,
   private _cookieService: CookieService,
   private readonly _messageService:MessageService
  ) {
    _store.select(selectUserSuccess).subscribe((data)=>{
      if(!data) {
        // _router.navigate(['/register'])
      }
    })
    _store.select(selectOtpVerificationFail).subscribe((data)=>{
      if(data)
      this._messageService.add({ severity: 'error', summary: 'error', detail: data as string })
    })

   }
 
 onOtpChange($event: string) {
    this.otp = $event
    if(this.otp.length === 5) {
      this.OnSubmit(this.otp) 
    }
  }
   
  
  OnSubmit(otp:string) {
     const userData = this._cookieService.get('userData')         
     if(!userData) {
      this._messageService.add({ severity: 'error', summary: 'Time Out', detail: "Time Out" })
     } 
     this._store.dispatch(verifyOtp({userData,otp}))
  }

}

