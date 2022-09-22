import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  public loginForm!:FormGroup

  constructor(private http:HttpClient,private router:Router,private formBuilder:FormBuilder,private dialogRef:MatDialogRef<AdminloginComponent>) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
    return this.http.get<any>("http://localhost:3000/admin/").
    subscribe(res=>{const user=res.find((a:any)=>{return a.email===this.loginForm.value.email&&a.password===this.loginForm.value.password});
  if(user)
  {alert("logged in successfully");
    this.loginForm.reset();
    this.router.navigate(['add-products'])
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
