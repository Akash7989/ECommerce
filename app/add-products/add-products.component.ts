import { Component, OnInit,ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
 

  constructor(private dialog:MatDialog,private api:ApiService,public router:Router) { }
  displayedColumns: string[] = ['title', 'image', 'description', 'price','category','total','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getProduct();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
      
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getProduct();
      }
    });
  }
  openRegisteration(){
    this.router.navigateByUrl("/registeration-list")
  }
  getProduct(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        console.log(res);
      },
      error:(err)=>{
        alert("Error while fetching the Records")
      }
    })
  }
  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getProduct();
      }
    })
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("delted successfully");
        this.getProduct();


      },
      error:()=>{
        alert("error");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




