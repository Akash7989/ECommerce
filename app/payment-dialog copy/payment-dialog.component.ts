import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  constructor(private http:HttpClient,private cartService:CartService) { }
itemAmount:any="";
  ngOnInit(): void {
    this.itemAmount=this.cartService.getCartList();

  }
  pay(cash:any){

  }

}
