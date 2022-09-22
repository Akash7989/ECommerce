import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { FormGroup,Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { timeInterval } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // item!:FormGroup;
  title:string="";
  category:string="";
  price:string="";
  quantity:string="";
  image:string="";
  description:string="";
  item:any;
public grandTotals:any="";
public cartList:any=[];
  public productList: any;
public filterCategory:any;
searchKey:string="";
email:string="";
  constructor(private api:ApiService,public _router:Router,private cartService:CartService,private dialogBox:MatDialog,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.email=this.cartService.getemail();

    
    this.cartService.getcartProduct().subscribe(res=>{
      this.cartList=res;
      
    })
    this.api.getProduct().subscribe(res=>{
      this.productList=res;
      this.filterCategory=res;
      this.productList.forEach((a:any)=>{
        if(a.category==="women's clothing"||a.category==="men's clothing"){
          a.category="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price})
      });
    });
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey=val;
      
    })
    
    this.item=this.formbuilder.group({
      title :['',Validators.required],
      category :['',Validators.required],
      price :['',Validators.required],
      description :['',Validators.required],
      image :['',Validators.required],
      total:['',Validators.required],
      email:['',Validators.required]
    
      
    })
    
  }
  
  // totalamount(){
  //   this.cartList.map((a:any)=>{
  //     this.grandTotals+=a.total;    
  //     console.log(this.grandTotals)

  //   })
  //   return this.grandTotals;
  // }

  increaseQuantity(){
    let i=0;
    this.cartList.map((a:any,index:any)=>{
      console.log(a.price)
      
      a.total+=a.total;

                i+=a.total;
                  // console.log(i)
                  this.grandTotals=i;
                
              
            
              
            })
      }
 
  addtoCart(item:any){
let i=0;
item.price=item.total;
      this.cartList.map((a:any,index:any)=>{
        if(item.id===a.id){
          item.quantity+=a.quantity;
          item.total+=a.total;
          
          this.cartService.updateCart(item,item.id).subscribe();
         
        }
      
        
      })
      
      this.cartService.addtoCartService(item).subscribe();
      this.cartService.setCartList(this.grandTotals);


    


  }
 hide(){
  let hide=true;
  return hide;
  

  }
  loginFirst(){
    if(confirm("Kindly login to buy products")){
      this.dialogBox.open(LoginComponent,{
        width:'30%'
      })
      };
    } 
    public filter(category:String){
      this.filterCategory=this.productList.filter((a:any)=>{
        if(a.category==category||category==''){
          return a;
        }
      })
  
    
  }


}