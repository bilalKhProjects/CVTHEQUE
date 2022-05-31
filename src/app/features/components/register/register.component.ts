import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, FormGroupName, NgForm, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  formData: any = {};
  errors: any = [];
  minPw = 8;
  formGroup: FormGroup;
    submitted = false;


  constructor(private auth:AuthService, private router:Router,private formBuilder: FormBuilder,private matSnackBar: MatSnackBar) { }

  ngOnInit() : void{
    this.formGroup = this.formBuilder.group({
      username: ['',Validators.compose([Validators.required,Validators.maxLength(50),Validators.pattern('[A-Za-z0-9_]*')])],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minPw)]],
      password2: ['', [Validators.required]],
  }, {
    validator: passwordMatchValidator  }); 
  }
  get password() { return this.formGroup.get('password'); }
  get password2() { return this.formGroup.get('password2'); }
  onPasswordInput() {
    if (this.formGroup.hasError('passwordMismatch'))
      this.password2.setErrors([{'passwordMismatch': true}]);
    else
      this.password2.setErrors(null);
  }
  register(): void {
    this.errors = [];
    this.auth.register(this.formGroup.value)
      .subscribe(() => {
        this.router.navigate(['/login']);
        this.matSnackBar.open('User has been registered successfully', 'close',{horizontalPosition:'center',verticalPosition:'top',duration: 600, panelClass:["snack-success"]})

       },
        (errorResponse) => {
          console.log(errorResponse)
          this.errors.push(errorResponse.error.error);
          this.matSnackBar.open(errorResponse?.error?.error, 'close',{horizontalPosition:'center',verticalPosition:'top', duration: 600,panelClass:["snack-error"]})
        });
  }
}
export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('password2').value)
    return null;
  else
    return {passwordMismatch: true};
};


