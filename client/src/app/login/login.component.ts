import { MatInputModule } from '@angular/material/input';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordValidator } from '../_validator/password.validator';
import { PasswordMatchValidator } from '../_validator/password.match.validator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatInputModule, MatButtonModule, MatDatepickerModule,MatRadioModule,MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class LoginComponent {
  mode: 'login' | 'register' = 'login'
  form: FormGroup

  private readonly _currentYear = new Date().getFullYear()
  readonly minDate = new Date(this._currentYear - 70, 0, 1)
  readonly maxDate = new Date(this._currentYear - 18, 11, 31)
  readonly startDate = new Date(this._currentYear - 18, 0, 1)

  errorMassage = {
    username: signal(''),
    password: signal(''),
    display_name: signal(''),
    confirm_password: signal(''),
  }
  constructor() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      password: new FormControl(null, [Validators.required, PasswordValidator(8, 16)]),
    })
  }

  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login'
  }
  updateForm() {
    if (this.mode === 'register') {
      this.form.addControl('confirm_password', new FormControl(null, [Validators.required]))
      this.form.setValidators(PasswordMatchValidator('password', 'confirm_password'))

      this.form.addControl('display_name', new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]))
      this.form.addControl('date_of_virth', new FormControl(null, [Validators.required]))
      this.form.addControl('gender', new FormControl(null, [Validators.required]))
      this.form.addControl('looking_for', new FormControl(null, [Validators.required]))

    } else {
      this.form.removeControl('confirm_password')
      this.form.setValidators(PasswordMatchValidator('password', 'confirm_password'))
      this.form.removeControl('display_name')
      this.form.removeControl('date_of_virth')
      this.form.removeControl('gender')
      this.form.removeControl('looking_for')
    }
  }

  onSubmit() {
  }


  updateErrorMassage(ctrlName: string) {
    const control = this.form.controls[ctrlName]
    if (!control) return

    switch (ctrlName) {
      case 'username':
        if (control.hasError('required'))
          this.errorMassage.username.set('Username is required')
        else if (control.hasError('minlength'))
          this.errorMassage.username.set('Username must be at least 6 characters')
        else if (control.hasError('maxlength'))
          this.errorMassage.username.set('must be at most 16 characters or fewer')
        else
          this.errorMassage.username.set('')
        break;

      case 'password':
        if (control.hasError('required'))
          this.errorMassage.password.set('password is required')
        else if (control.hasError('invalidMinLength'))
          this.errorMassage.password.set('Password must be at least 8 characters long')
        else if (control.hasError('invalidMaxLength'))
          this.errorMassage.password.set('Password must be at most 16 characters fewer')
        else if (control.hasError('invalidLowerCase'))
          this.errorMassage.password.set('must contain at least 1 lower-case letter')
        else if (control.hasError('invalidUpperCase'))
          this.errorMassage.password.set('must contain at least 1 upper-case letter')
        else if (control.hasError('invalidNumberric'))
          this.errorMassage.password.set('must contain at least 1 number')
        else if (control.hasError('invalidSpecialChar'))
          this.errorMassage.password.set('must contain at least 1 special character')
        else
          this.errorMassage.password.set('')
        break;

      case 'confirm_password':
        if (control.hasError('required'))
          this.errorMassage.confirm_password.set('confirm password is required')
        else if (control.hasError('passwordMismatch'))
          this.errorMassage.confirm_password.set('password mismatch')
        break;

      case 'display_name':
        if (control.hasError('required'))
          this.errorMassage.display_name.set('display name is required')
        else if (control.hasError('minlength'))
          this.errorMassage.display_name.set('display name must be at least 3 characters')
        else if (control.hasError('maxlength'))
          this.errorMassage.display_name.set('display name must be at most 8 characters')
        else
          this.errorMassage.display_name.set('')
        break;

    }
  }

}
