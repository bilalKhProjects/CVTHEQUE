import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { CandidatService } from 'src/app/core/service/candidat.service';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef, _closeDialogVia } from '@angular/material/dialog';
import { Candidat } from 'src/app/core/models/candidat.model';
import { MatTableDataSource } from '@angular/material/table';

// declare global {
//   interface Navigator {
//     msSaveOrOpenBlob: (blobOrBase64: Blob | string, filename: string) => void
//   }
// }

@Component({
  selector: 'app-detailscandidat',
  templateUrl: './detailscandidat.component.html',
  styleUrls: ['./detailscandidat.component.css']
})



export class DetailscandidatComponent implements OnInit {
  dataSource = new MatTableDataSource<Candidat>();
  detailCandidat:any;
  
  constructor(protected readonly can:CandidatService,@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.getCandidatById(this?.data.dataKey)
  }
  
  getCandidatById(id){
    this.can.getByIdCandidat(id).subscribe((result: any)=>
    {
      this.detailCandidat=result.rst;
      console.log(this.detailCandidat.cv)
    }
    )
  }

  onClickDownloadPdf(){
     fetch(this.detailCandidat.cv).then(res => res.blob()).then(r=> this.downloadPdf(r,this.detailCandidat.name))
     console.log(this.detailCandidat.cv)
  }

  downloadPdf(blob, fileName) {
    if(window.navigator && window.navigator.msSaveOrOpenBlob){ 
     window.navigator.msSaveOrOpenBlob(blob,`${fileName}.pdf`);
   } else {
    const url = window.URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = `${fileName}.pdf`
    document.body.appendChild(element)
    element.click()
  }
}




}

