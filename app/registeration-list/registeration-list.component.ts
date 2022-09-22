import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { DialogRegisterBoxComponent } from '../dialog-register-box/dialog-register-box.component';

@Component({
  selector: 'app-registeration-list',
  templateUrl: './registeration-list.component.html',
  styleUrls: ['./registeration-list.component.css']
})
export class RegisterationListComponent implements OnInit {

  constructor(private dialog:MatDialog,private api:ApiService) { }
  displayedColumns: string[] = ['username', 'email', 'number', 'address','city','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getProduct();
  }
  openDialog() {
    this.dialog.open(DialogRegisterBoxComponent, {
      width:'30%'
      
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getProduct();
      }
    });
  }
  getProduct(){
    this.api.getRegisteration().subscribe({
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
    this.dialog.open(DialogRegisterBoxComponent,{
      width:'30%',data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getProduct();
      }
    })
  }
  deleteRegisteration(id:number){
    this.api.deleteRegisteration(id).subscribe({
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
