import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogRegisterBoxComponent } from '../dialog-register-box/dialog-register-box.component';
import { LoginComponent } from '../login/login.component';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public totalItem:number=0;
  public searchTerm!:string;
    constructor(public router: Router,public route: ActivatedRoute,private cartService:CartService ,private dialogBox:MatDialog) { }
  
    ngOnInit(): void {
      this.cartService.getProduct().subscribe(res=>{
        this.totalItem=res.length;
    
    })
  
  }
  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm)
  }
  home(){
    if(confirm("Once you logged out your datas will be lost")){
      this.router.navigateByUrl("/login");
    }
    
    
   
  }
  openDialog(){
    this.dialogBox.open(DialogRegisterBoxComponent,{
      width:'30%'
    })
  }
  login(){
    this.dialogBox.open(LoginComponent,{
      width:'30%'
    })
  }
  loginFirst(){
    if(confirm("Your cart is empty. Kindly login to fill your cart")){
      this.dialogBox.open(LoginComponent,{
        width:'30%'
      })
      };
    } 
  }

 