import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {  Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isLogged:boolean = false;
  constructor(private _AuthService:AuthService,
    private genericService : GenericService,
     private router:Router ,
     private toaster:ToastrService,
     private spinner: NgxSpinnerService,
     ) { }

  ngOnInit(): void {
  }

  signIn = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])

  });

  login()
  {


    if(this.signIn.valid){


      this.spinner.show();
        let data = {
          "email":this.signIn.controls.email.value,
          "password":this.signIn.controls.password.value,

        }
      this.genericService.create('signIn',data).subscribe((response)=>{
        this.spinner.hide();
        console.log(response);
        if(response.status ==true){
          this.isLogged = true
          localStorage.setItem('TOKEN',response.data.token);
          localStorage.setItem('user',JSON.stringify(response.data.user));
          this.router.navigate(['/home']);

          this.toaster.success(response.message);
        }
        else{

          this.toaster.error(response.message);
        }
      })



    }

  }
  

  

}
