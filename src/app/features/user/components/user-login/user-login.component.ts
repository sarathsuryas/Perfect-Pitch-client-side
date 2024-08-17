import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { loginUser } from 'src/app/store/user/user.action';
import { selectIsAuthUser, selectLoginFail } from 'src/app/store/user/user.selector';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup
  submitted = false;
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<UserState>,
    private readonly _messageService: MessageService,
    private readonly _router:Router
  ) { }
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['',Validators.compose([Validators.required])],
      password: ['',Validators.compose([Validators.required])]
    })
    this._store.select(selectIsAuthUser).subscribe(isAuthenticated=>{
      if(isAuthenticated) {
        this._router.navigate(['home'])
      }
    })
  }

  submit() {
    this.submitted = true
    if(this.loginForm.valid) {
      const {email,password} = this.loginForm.value
      this._store.dispatch(loginUser({email,password}))
      this._store.select(selectLoginFail).subscribe((data)=>{
        if(data) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: data })
        }
      })
    }
  }

}
