import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { adminLogin } from 'src/app/store/admin/admin.action';
import { selectAdminLoginError } from 'src/app/store/admin/admin.selector';
import { AdminState } from 'src/app/store/admin/admin.state';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm!: FormGroup
  submitted = false;
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<AdminState>,
    private readonly _messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['',Validators.compose ([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)])]
    })
  }

  submit() {
    this.submitted = true
    if(this.loginForm.valid) {
      const {email,password} = this.loginForm.value
     this._store.dispatch(adminLogin({email,password}))
     this._store.select(selectAdminLoginError).subscribe((error)=>{
     
    if(error) {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: error })

    }
     })
    }
  }

}
