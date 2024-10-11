import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from './user/components/otp/otp.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { NgOtpInputModule } from 'ng-otp-input';
import {  CountdownModule } from 'ngx-countdown';



@NgModule({
  declarations: [OtpComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ToastModule,
    NgOtpInputModule,
    CountdownModule, 
    
  ],
  
})
export class SharedModule { }
