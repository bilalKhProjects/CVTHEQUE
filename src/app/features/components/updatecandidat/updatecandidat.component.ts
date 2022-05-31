import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidatService } from 'src/app/core/service/candidat.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Candidat } from 'src/app/core/models/candidat.model';

@Component({
  selector: 'app-updatecandidat',
  templateUrl: './updatecandidat.component.html',
  styleUrls: ['./updatecandidat.component.css']
})

export class UpdatecandidatComponent implements OnInit {
  formAdd: FormGroup;
  formUpdate: any = {};
  selectedFiles: any;
  file: File= null;
  showMessageError:boolean;
  messageError:string;
  formData: any = {};
  selectedFileBase64:any;
  detailCandidat:any;
  errors: any = [];

  


  constructor( protected readonly can:CandidatService,private matSnackBar: MatSnackBar,fb: FormBuilder,private formBuilder: FormBuilder,public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
  
  ngOnInit(): void {
    this.formAdd=this.formBuilder.group({
      cin:[],
      lastName:[],
      name:[],
      age:[],
      city:[],
      exp:[],
      gender:[],
      cv:[]
    });
    this.getCandidatById(this.data.dataKey._id); 
  }

  initForm(){
    console.log(this.detailCandidat)
    this.formAdd=this.formBuilder.group({
      cin:[this.detailCandidat?.cin,Validators.compose([Validators.required,Validators.maxLength(8),Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]*$')])],
      lastName:[this.detailCandidat?.lastName,Validators.compose([Validators.required,Validators.maxLength(20),Validators.pattern('[a-zA-Z ]*$')])],
      name:[this.detailCandidat?.name,Validators.compose([Validators.required,Validators.maxLength(20),Validators.pattern('[a-zA-Z ]*$')])],
      age:[this.detailCandidat?.age,[Validators.required]],
      city:[this.detailCandidat?.city,[Validators.required]],
      exp:[this.detailCandidat?.exp,[Validators.required]],
      gender:[this.detailCandidat?.gender,[Validators.required]],
      cv:[this.detailCandidat?.cv]

    });
  }
  

 
  onclick(){
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
      this.can.updateCandidat(candidat,this?.data?.dataKey?._id)
      .subscribe(()=>
      {
        console.log('Data updated successfully!')
        this.matSnackBar.open('Candidat has been updated successfully', 'close',{horizontalPosition:'center',verticalPosition:'top',duration: 600,panelClass:["snack-success"]})
        this.dialogRef.close();
      },(errorResponse) => {
        console.log(errorResponse)
        this.errors.push(errorResponse.error.error);
        this.matSnackBar.open(errorResponse?.error?.error, 'close',{horizontalPosition:'center',verticalPosition:'top', duration: 600,panelClass:["snack-error"]})
      });
    }
  }

  getCandidatById(id){
    this.can.getByIdCandidat(id).subscribe((result: any)=>
     {
      this.detailCandidat=result.rst;
      this.initForm()
    }
    )
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
