import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public quantity:any=1;
  public products:any=[];
  public grandTotal!:number;
  public item1!:any;
  public insert1!:any;
  email:String="";
  public item2!:any
  amount!: number;
paymentList:any="";
    constructor(private dialog:MatDialog,private api:ApiService,private cartService:CartService,public router:Router) { }
  
    ngOnInit(): void {
      this.email=this.cartService.getemail();
     
              this.grandTotal=this.cartService.grandTotal;
      this.cartService.getcartProduct().subscribe(res=>{
        this.products=res;
        
        // this.grandTotal=this.cartService.getTotalPrice();
      })
      this.item1=this.cartService.cartItemList;
      // this.amount=this.grandTotal;

     
  
      
    }
   
    increaseQuantity(){
      let i=0;
      this.products.map((a:any,index:any)=>{
        console.log(a.price)
        
        a.total+=a.total;
  
                  i+=a.total;
                    console.log(i)
                    i=this.grandTotal;
                  
                
              
                
              })
              return this.grandTotal;
      
        }
    removeItem(item:any){
       this.cartService.reomoveCartItem(item);
       console.log(this.email)
       
    }
    emptyCart(){
      this.cartService.reomoveAllcart();
    }
    loginFirst(){
      alert("login to buy products");
      this.router.navigateByUrl("/login");
    }
    deleteProduct(id:number,item:any){

      this.api.deleteCartProduct(id).subscribe({
        next:(res)=>{
          this.cartService.reomoveCartItem(item);
          this.cartService.getcartProduct().subscribe(res=>{
            this.products=res;
            // this.grandTotal=this.cartService.getTotalPrice();
          })
  
  
        },
        error:()=>{
          alert("error");
        }
      })
    }
    payment(){
      let grandTotal=0;
  this.products.map((a: any)=>{
    grandTotal+=a.total;
  })
  this.dialogBox();
  console.log(grandTotal)
  return grandTotal
   

    

  } 
  dialogBox(){
    this.dialog.open(PaymentDialogComponent, {
      width:'30%'
      
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        // this.getProduct();
      }
    });
  }
}