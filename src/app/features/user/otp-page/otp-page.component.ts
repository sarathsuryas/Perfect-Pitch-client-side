import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/features/user/services/user/user.service';
import { verifyOtp } from 'src/app/store/user/user.action';
import { userModel } from 'src/app/store/user/user.model';
import { selectOtpVerificationFail, selectUserData, } from 'src/app/store/user/user.selector';
import { UserState } from 'src/app/store/user/user.state';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent implements OnDestroy{
  config!: CountdownConfig;
  timeData:number = 60
  disable:boolean = false
  color:string = 'red'
  TimerColor:string = 'silver'
  otp = ''
 obs$!:Observable<string>
  constructor(private readonly _fb: FormBuilder,
    private _store: Store<UserState>, private _router: Router,
    private _cookieService: CookieService,
    private  _messageService: MessageService,
    private  _userAuthService:UserAuthService,
  ) {
    _store.select(selectUserData).subscribe((data) => {
      if (!data) {
        _router.navigate(['/register'])
      }
    })
    _store.select(selectOtpVerificationFail).subscribe((data) => {
      if (data)
        this._messageService.add({ severity: 'error', summary: 'error', detail: data as string })
    })


  }
  
  ngOnInit(): void {
    this.config = { leftTime: this.timeData, demand: true };
    
  }

  start(_event:Event) {
    this.config = {leftTime:this.timeData, demand:false};
    this.disable = true
    this.color = 'silver'
    this.TimerColor = 'red'
    const userData = this._cookieService.get('userData')
    if (!userData) {
     return this._messageService.add({ severity: 'error', summary: 'Time Out', detail: "Time Out" })
    }
   this._userAuthService.resendOtp(userData).subscribe({
    next:(data)=> {
      
      this._cookieService.put('userData',data)
    },
    error:(err)=>{
      console.error(err)
    }
  })
    
    setTimeout(()=>{
       this.disable = false
       this.color = 'red' 
       this.TimerColor = 'silver'
    },60000)
    
  }

  onOtpChange($event: string) {
    this.otp = $event

    const regexOtp = /^[0-9]+$/
    if (this.otp.length === 5 && regexOtp.test(this.otp)) {
      this.OnSubmit(this.otp)
    }
  }


  OnSubmit(otp: string) {
    const userData = this._cookieService.get('userData') as string
    if (!userData) {
      this._messageService.add({ severity: 'error', summary: 'Time Out', detail: "Time Out" })
    }
    this._cookieService.remove('userData')
    this._store.dispatch(verifyOtp({ userData, otp }))
  }
  ngOnDestroy(): void {
   
  }

}
