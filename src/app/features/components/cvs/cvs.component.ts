import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/service/auth.service';
import { CandidatService } from 'src/app/core/service/candidat.service';
import { AddcandidatComponent } from '../addcandidat/addcandidat.component';
import { MatDialog, MatDialogRef, _closeDialogVia } from '@angular/material/dialog';
import { Candidat } from 'src/app/core/models/candidat.model';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DeletecandidatComponent } from '../deletecandidat/deletecandidat.component';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { UpdatecandidatComponent } from '../updatecandidat/updatecandidat.component';
import { DetailscandidatComponent } from '../detailscandidat/detailscandidat.component';


export interface PeriodicElement {
  CIN: string;
  name: string;
  lastName: string;
  sexe: string;
  age:number;
  ville:string;
  exp: number;
}

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.scss']
})
export class CvsComponent implements OnInit {
  
  sideBarOpen = true;
  displayedColumns: string[] = [ 'cin', 'name', 'lastName','sexe', 'age','ville', 'exp','details','delete','update'];
  dataSource = new MatTableDataSource<Candidat>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  sort: MatSort;

  @ViewChild('deleteTpl', {static:true})
  deleteDialogTpl: TemplateRef<any>
  deleteDialogRef: MatDialogRef<any>

  selectedCandidatId:string;
  candidatDetailId:string;
  candidatDetails:any;

  

  constructor(protected readonly auth:AuthService, public dialog: MatDialog,protected readonly can:CandidatService, private matSnackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    this.getAllCandidats();
  }
  
// Details candidat

  openDetailDialog(candidat: Candidat):void{
    this.candidatDetailId=candidat._id
    const dialog= this.dialog.open(DetailscandidatComponent,{
      height:'500px',
      width:'400px',
      data:{
        dataKey: this.candidatDetailId
      }
    });
    dialog.afterClosed().subscribe(result=>{
      console.log('The dialog was closed')
      this.getAllCandidats()
    })
  }


// Delete candidat 

deleteCandidat():void{
  if(this.selectedCandidatId){
    this.can.deleteCandidat(this.selectedCandidatId).subscribe((result:any)=>
    {
      this.matSnackBar.open('Candidat has been deleted successfully', 'close',{horizontalPosition:'center',verticalPosition:'top',duration: 600,panelClass:["snack-success"]})
      this.deleteDialogRef.close();
    })
  }
}
deleteOneCandidat(candidat:Candidat): void{
  this.selectedCandidatId = candidat?._id
  this.deleteDialogRef= this.dialog.open(this.deleteDialogTpl,{
    height: '170px',  
    width: '320px',
  });

  this.deleteDialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.getAllCandidats()
  });
}
  // get candidats 
  getAllCandidats(){
  this.can.getCandidat().subscribe((result:any)=>{
    this.dataSource.data=result?.rst;
    console.log(result.rst)
  })
  }

  // Side bar, Filter, paginator 
  sideBarToggler(event: Event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

// Add candidat dialog

  openDialog(): void {
    const dialog = this.dialog.open(AddcandidatComponent,{
      height: '360px',  
      width: '750px',
    });

    dialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllCandidats()
    });
  }

// Update candidat dialog 
  openUpdateDialog(candidat: Candidat):void{
    this.candidatDetails=candidat
    const dialog= this.dialog.open(UpdatecandidatComponent,{
      height:'340px',
      width:'750px',
      data:{
        dataKey: this.candidatDetails
      }
    });
    dialog.afterClosed().subscribe(result=>{
      console.log('The dialog was closed')
      this.getAllCandidats()
    })
  }

// Authentification 
  isAuthenticated(){
    return this.auth.isAuthenticated()
  }

}


