import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-register-box',
  templateUrl: './dialog-register-box.component.html',
  styleUrls: ['./dialog-register-box.component.css']
})
export class DialogRegisterBoxComponent implements OnInit {

  productForm!:FormGroup;
  savebutton:string="Add";
    constructor(private api:ApiService ,@Inject(MAT_DIALOG_DATA) public editData:any,private formbuilder:FormBuilder, private dialogRef:MatDialogRef<DialogComponent>) { }
  
    ngOnInit(): void {
  this.productForm=this.formbuilder.group({
    username :['',Validators.required],
    email :['',Validators.required],
    number :['',Validators.required],
    address :['',Validators.required],
    city :['',Validators.required],
    state :['',Validators.required],
    pincode :['',Validators.required],
    password:['',Validators.required]

  
   
    
  })
  if(this.editData){
    this.savebutton="update";
    this.productForm.controls['username'].setValue(this.editData.username);
    this.productForm.controls['email'].setValue(this.editData.email);
    this.productForm.controls['password'].setValue(this.editData.password);

    this.productForm.controls['number'].setValue(this.editData.number);
    this.productForm.controls['address'].setValue(this.editData.address);
    this.productForm.controls['city'].setValue(this.editData.city);
    this.productForm.controls['state'].setValue(this.editData.state);
    this.productForm.controls['pincode'].setValue(this.editData.pincode);


  
  }
    }
  addProduct(){
    console.log(this.productForm.value)
   if(!this.editData){
    if(this.productForm.valid){
      this.api.postRegisteration(this.productForm.value).subscribe({next:(res)=>{
        alert("Registeration done successfully")
  
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
    this.api.editRegisteration(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{alert("Data updated Successfully");
    this.productForm.reset();
  this.dialogRef.close('update');},
  error:()=>{alert("Error in updating the product");}
  
    })
    
  }

}
