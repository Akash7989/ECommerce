import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminloginComponent } from '../adminlogin/adminlogin.component';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public router: Router,public route: ActivatedRoute,private cartService:CartService ,private dialogBox:MatDialog) { }

  ngOnInit(): void {
  }
  adminlogin(){
    this.dialogBox.open(AdminloginComponent,{
      width:'30%'
    })
  }
}
