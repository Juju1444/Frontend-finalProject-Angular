import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private genericService : GenericService,
     private router:Router ,
     private toaster:ToastrService,
     private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
  }


  signUp = new FormGroup({
    name:new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])

  });

  register()
  {


    if(this.signUp.valid){


      let data = {
        "name":this.signUp.controls.name.value,
        "email":this.signUp.controls.email.value,
        "password":this.signUp.controls.password.value,

      }

      this.spinner.show();
        
      this.genericService.create('signUp',data).subscribe((response)=>{
        this.spinner.hide();
        console.log(response);
        if(response.status ==true){
          
          

          this.toaster.success(response.message);
          this.router.navigateByUrl('/login')

        }
        else{

          this.toaster.error(response.message);
        }
      })



    }

  }

}
