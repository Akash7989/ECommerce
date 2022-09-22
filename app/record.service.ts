import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from './adminupdate/product';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http:HttpClient) { }
  url="http://localhost:9099/admindata"
  url1="http://localhost:9099/login"
  url2="http://localhost:9099/adminlogin"
  url3="http://localhost:9099/checkanswer"
  url4="http://localhost:9099/usercheckanswer"
  url5="https://fakestoreapi.com/products"
  url7="http://localhost:9099//cart/grocery/{email}"
  url8="http://localhost:9099/player"
  url9="http://localhost:9099/cartShow"
  url10="http://localhost:9099/viewapp"
  url11="http://localhost:9099/viewapp1"
  url12="http://localhost:9099/deletemenu"
  url13="https://fakestoreapi.com/products/6"

  insertservice(data:any){
    
    return this.http.post(this.url,data);

  }
 updateProductsByAdminService(data:Product){
  console.log(data)
    return this.http.post<Product>(this.url5,data);
  }
  // public loginUserFromRemote(user:User):Observable<object>{
  //   // console.log(user)
  //   return this.http.post(this.url1,user);



  // }
  // public adminloign(user:User):Observable<object>{
  //   return this.http.post(this.url2,user);
  // }
  // public adminanswer(answer:Admindata):Observable<object>{
  //   return this.http.post(this.url3,answer);
  // }

  // public useranswer(answer:Admindata):Observable<object>{
  //   return this.http.post(this.url4,answer);
  // }
  


  getCustomerDetails(data:String){
    console.log(data)
    return this.http.post(this.url10,data);
  }
  getProductDetails(data:String){
    console.log(data)
    return this.http.post(this.url11,data);
  }
  deleteOne(data:any){
    console.log(data)
    return this.http.delete("https://fakestoreapi.com/products/6");  } 
  // deleteMenu(id:any){
  //   return this.http.delete("https://fakestoreapi.com/products"+id).pipe(map((res:any)=>{
  //     // console.log(res)
  //     return res.json();
  //   }))

    
  // }
 deleteMenu(id:any):Observable<object>{
    return this.http.delete(this.url13);

  // deleteMenu(id:any){
  //   return this.http.delete('https://fakestoreapi.com/products/'+id).map(res=>{return res.json()});

  // }}
}}