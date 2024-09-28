import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { RegisterUserDto } from 'src/app/core/dtos/registerUserDto';
import { registerUser } from 'src/app/store/user/user.action';
import { selectUserFail } from 'src/app/store/user/user.selector';
import { UserState } from 'src/app/store/user/user.state';
import Validation from 'src/app/utils/validation';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  registerForm!: FormGroup
  submitted = false;
  error$!: Observable<string | null>
  constructor
    (
      private readonly _fb: FormBuilder,
      private readonly _store: Store<UserState>,
      private readonly _messageService: MessageService
    ) {
    this.error$ = this._store.select(selectUserFail)
  }


  ngOnInit(): void {
    this.registerForm = this._fb.group({
      fullName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required])],
    })


  }



  onSubmit() {
    this.submitted = true
    let value = this.registerForm.controls['confirmPassword']


    if (!this.registerForm.invalid) {
      const { fullName, email, password } = this.registerForm.value
      
      const obj: RegisterUserDto = {
        fullName: fullName,
        email: email,
        password: password
      }
      this._store.dispatch(registerUser({ userData: obj }))
      this.error$.subscribe((data) => {
        if (data) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: data })
        }
      })

    }
  }


}
