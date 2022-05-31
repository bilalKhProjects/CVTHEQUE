import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CvsComponent } from '../cvs/cvs.component';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA, _closeDialogVia} from '@angular/material/dialog';
import { CandidatService } from 'src/app/core/service/candidat.service';
import { style } from '@angular/animations';
import {MatInputModule} from '@angular/material/input';
import { Candidat } from 'src/app/core/models/candidat.model';
import { AUG } from '@angular/material/core';

@Component({
  selector: 'app-addcandidat',
  templateUrl: './addcandidat.component.html',
  styleUrls: ['./addcandidat.component.css']
})

export class AddcandidatComponent implements OnInit {
  
  sideBarOpen = true;
  options: FormGroup;
  formAdd: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  selectedFiles: any;
  file: File= null;
  showMessageError:boolean;
  messageError:string;
  formData: any = {};
  selectedFileBase64:any;
  errors: any = [];



  constructor(protected readonly auth:AuthService,protected readonly can:CandidatService, fb: FormBuilder,private formBuilder: FormBuilder,private matSnackBar: MatSnackBar,public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
   }

  ngOnInit(
  ): void {
    this.formAdd=this.formBuilder.group({
      cin:['',Validators.compose([Validators.required,Validators.maxLength(8),Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]*$')])],
        lastName:['',Validators.compose([Validators.required,Validators.maxLength(20),Validators.pattern('[a-zA-Z ]*$')])],
        name:['',Validators.compose([Validators.required,Validators.maxLength(20),Validators.pattern('[a-zA-Z ]*$')])],
        age:['',[Validators.required]],
        city:['',[Validators.required]],
        exp:['',[Validators.required]],
        gender:['',[Validators.required]],
        cv:['',[Validators.required]]
    });
  }
  sideBarToggler(event: Event) {
    this.sideBarOpen = !this.sideBarOpen;
  }
  isAuthenticated(){
    return this.auth.isAuthenticated()
  }
  onSubmit(){
    if(!this.formAdd.valid || this.showMessageError){
      this.matSnackBar.open('Oops something got wrong, please retry!', 'close',{horizontalPosition:'center',verticalPosition:'top',duration: 600,panelClass:["snack-error"]})
    }
    else{
      const formData = this.formAdd.getRawValue()
      const candidat:Candidat ={
        cin:formData.cin,
        lastName:formData.lastName,
        name:formData.name,
        gender:formData.gender,
        age:formData.age,
        city:formData.city,
        exp:formData.exp,
        cv:this.selectedFileBase64
      }
      this.can.addCandidat(candidat)
      .subscribe(()=>
      {
        console.log('Data added successfully!')
        this.matSnackBar.open('Candidat has been registered successfully', 'close',{horizontalPosition:'center',verticalPosition:'top',duration: 600,panelClass:["snack-success"]})
        this.dialogRef.close();
      },
      (errorResponse) => {
        console.log(errorResponse)
        this.errors.push(errorResponse.error.error);
        this.matSnackBar.open(errorResponse?.error?.error, 'close',{horizontalPosition:'center',verticalPosition:'top', duration: 600,panelClass:["snack-error"]})
      });
    }

  }
  selectFile(event) {
    this.selectedFiles = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles);
    reader.onload = () => {
      console.log(reader.result);
      this.selectedFileBase64 =reader.result;
      

    if(!this.selectedFiles){
      this.showMessageError=true
      this.messageError ='No file uploaded';
    }
    else{
      this.selectedFiles;
      if(!['application/pdf'].includes(this.selectedFiles.type)){
        this.showMessageError = true
        this.messageError ='File should be a pdf';
        this.selectedFiles=null;
      }else if (this.selectedFiles.size>2e+6){
        this.showMessageError = true
        this.messageError = 'File is too large. Over 2MB'
        this.selectedFiles=null;
      }else{
        console.log('File is valid ')
        this.showMessageError=null;
      }
    }

 }
 }



}
