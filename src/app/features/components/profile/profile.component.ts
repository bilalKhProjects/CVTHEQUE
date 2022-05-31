import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  sideBarOpen = true;

  constructor(protected readonly auth:AuthService) { }

  ngOnInit(): void {
  }
  sideBarToggler(event: Event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

  isAuthenticated(){
    return this.auth.isAuthenticated()
  }
}
