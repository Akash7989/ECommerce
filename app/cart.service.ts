import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url1="http://localhost:9099/cart1"
  url12="http://localhost:9099/updatemenu"
public email:any="";
public grandTotal:any="";
public cartItemList :any=[];
public productList= new  BehaviorSubject<any>([]);
public search=new BehaviorSubject<string>("");
 

  constructor(private http:HttpClient) { }
  getcartProduct(){
    return this.http.get<any>("http://localhost:3000/cart/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
getProduct(){
  return this.productList.asObservable();
}
setProduct(product:any){
  this.cartItemList.push(...product);

  this.productList.next(product);
  
    
  }
  
  
public addtoCartService(product:any){
  this.cartItemList.push(product);
  
  this.productList.next(this.cartItemList);
  // this.getTotalPrice();
  product.email=this.email;
  console.log(product.email)
  return this.http.post<any>("http://localhost:3000/cart/",product)
}

setCartList(data:any){
  this.grandTotal=data;
}
setemail(data:any){
  this.email=data;
}
getemail(){
  return this.email;
}
getCartList(){
  console.log(this.grandTotal)
  return this.grandTotal;
}

getTotalPrice():number{
  let grandTotal=0;
  this.cartItemList.map((a: any)=>{

  grandTotal+=a.total;
    console.log(grandTotal);
  })
  return grandTotal;
   }
   increaseQuantity(product:any){
    let grandQuantity=0;
    this.cartItemList.map((a:any,index:any)=>{
      if(product.id===a.id){
        grandQuantity+=a.quantity;
        console.log(grandQuantity)

      }
    })
   }
   reomoveCartItem(product:any){
    this.cartItemList.map((a:any,index:any)=>{
      if(product.id===a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
    
   }
   reomoveAllcart(){
   this.cartItemList=[]
   this.productList.next(this.cartItemList);

   }
   updateCart(data:any,id:number){
    console.log(data)
    console.log(id)
    this.productList.next(this.cartItemList);
    data.email=this.email;
    console.log(data.email)

    return this.http.put<any>("http://localhost:3000/cart/"+id,data)

  }
   
   addAllcart(data:any){
    
    this.productList.next(this.cartItemList);
    return this.http.post("http://localhost:9099/cart",data)
   }
   
 
  

    paymentService(data8: any) {

     
      return this.http.post( "http://localhost:9099/payment",data8);
    }
   
     
}
