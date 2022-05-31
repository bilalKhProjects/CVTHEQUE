import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CandidatService } from 'src/app/core/service/candidat.service';
import { CvsComponent } from '../cvs/cvs.component';
import { Candidat } from 'src/app/core/models/candidat.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, _closeDialogVia } from '@angular/material/dialog';

@Component({
  selector: 'app-deletecandidat',
  templateUrl: './deletecandidat.component.html',
  styleUrls: ['./deletecandidat.component.css']
})
export class DeletecandidatComponent implements OnInit {

  @Output()
  deleteCandidat: EventEmitter<any> =new EventEmitter()

  constructor(protected readonly can:CandidatService, private matSnackBar: MatSnackBar)
   { }

  ngOnInit(): void {
  }
}
