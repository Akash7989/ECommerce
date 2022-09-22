import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getRegisteration(){
    return this.http.get<any>("http://localhost:3000/Registeration/").pipe(map((res:any)=>{
      return res;
    })
    )
  }
  postProduct(data:any){
    console.log(data)

    return this.http.post<any>("http://localhost:3000/productList/",data)
  }
  postRegisteration(data:any){
    console.log(data)

    return this.http.post<any>("http://localhost:3000/Registeration/",data)
  }
  postCart(data:any){    console.log(data)

    return this.http.post<any>("http://localhost:3000/cart/",data)
  }
  editProduct(data:any,id:number){
    console.log(data)
    console.log(id)
    return this.http.put<any>("http://localhost:3000/productList/"+id,data)
  }
  editRegisteration(data:any,id:number){
    console.log(data)
    console.log(id)
    return this.http.put<any>("http://localhost:3000/Registeration/"+id,data)
  }
  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/productList/"+id);
  }
  deleteCartProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/cart/"+id);
  }
  deleteRegisteration(id:number){
    return this.http.delete<any>("http://localhost:3000/Registeration/"+id);
  }
  getCart(){
    return this.http.get<any>("https://fakestoreapi.com/carts")
  }
  getUserCart(){
    return this.http.get<any>("https://fakestoreapi.com/products").pipe(map((res:any)=>{
      // console.log(res)
      return res;
    }))
    
  }
  
}
