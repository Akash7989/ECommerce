import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private cartService:CartService,private router:Router,private dialogRef:MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
    this.cartService.setemail(this.loginForm.value.email);
  }

  login(){
    return this.http.get<any>("http://localhost:3000/registeration/").
    subscribe(res=>{const user=res.find((a:any)=>{return a.email===this.loginForm.value.email&&a.password===this.loginForm.value.password});
  if(user)
  {alert("logged in successfully");
    this.loginForm.reset();
    this.router.navigate(['product-list'])
    this.dialogRef.close('check');
  }
  else{
    alert('user not found');
  }},err=>{
    alert("somenthing went wrong");
  }
  )
  }
}