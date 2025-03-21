import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from '../features/user/components/otp/otp.component';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';

import { BrowserModule } from '@angular/platform-browser';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';



@NgModule({
  declarations: [
    PagenotfoundComponent
  ],
  imports: [
    CommonModule, 
    ToastModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    
  ],
  exports:[]
})
export class SharedModule { }
