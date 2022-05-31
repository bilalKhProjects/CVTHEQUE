import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  errors:any=[];
  notify:string;
  minPw:8;
  loginForm: FormGroup;

  constructor(private auth:AuthService,private router:Router, private fb: FormBuilder, private route:ActivatedRoute, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.initForm();
    this.route.queryParams.subscribe((params)=>{
      const key='loggedOut';
      if (params[key]==='success'){
        this.notify='You have been loggedout successfully';
      }
    });
}
  initForm() : void {
    this.loginForm= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minPw)]],
    });
  }
  isValidInput(fieldName: string | number): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }
  login() : void {
    this.errors=[];
    this.auth.login(this.loginForm.value)
  .subscribe((token)=>{ 
    this.router.navigate(['/profil'])
    this.matSnackBar.open('User has been logged successfully', 'close',{horizontalPosition:'center',verticalPosition:'top', duration: 300,panelClass:["snack-success"]});
},
(errorResponse) => {
  this.errors.push(errorResponse.error.error);
  this.matSnackBar.open(errorResponse?.error?.error, 'close',{horizontalPosition:'center',verticalPosition:'top',duration: 600,panelClass:["snack-error"]})
});

}

}