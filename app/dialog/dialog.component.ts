import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'; '@angular/matrial/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
productForm!:FormGroup;
savebutton:string="Add";
  constructor(private api:ApiService ,@Inject(MAT_DIALOG_DATA) public editData:any,private formbuilder:FormBuilder, private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
this.productForm=this.formbuilder.group({
  title :['',Validators.required],
  category :['',Validators.required],
  price :['',Validators.required],
  description :['',Validators.required],
  image :['',Validators.required],

 
  
})
if(this.editData){
  this.savebutton="update";
  this.productForm.controls['title'].setValue(this.editData.title);
  this.productForm.controls['category'].setValue(this.editData.category);
  this.productForm.controls['price'].setValue(this.editData.price);
  this.productForm.controls['description'].setValue(this.editData.description);
  this.productForm.controls['image'].setValue(this.editData.image);

}
  }
addProduct(){
  console.log(this.productForm.value)
 if(!this.editData){
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value).subscribe({next:(res)=>{
      alert("product added successfully")

      this.productForm.reset();
      this.dialogRef.close('save');
    }})
  }
 }
 else{
  this.updateProduct();
 }

}
updateProduct(){
  this.api.editProduct(this.productForm.value,this.editData.id).subscribe({
    next:(res)=>{alert("Product updated Successfully");
  this.productForm.reset();
this.dialogRef.close('update');},
error:()=>{alert("Error in updating the product");}

  })
  
}

}

