import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { GenericService } from 'src/app/services/generic.service';
declare var $:any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public departments:any[] = [];
  public employees:any[]= [];
  public employee:any;
  public user:any;

  constructor(
    private genericService : GenericService,
    private router:Router ,
    private toaster:ToastrService,
    private spinner: NgxSpinnerService,
    private auth:AuthService
  ) { 

  }

  ngOnInit(): void {

    this.getAllDepartments();

    this.getAllEmployees();

    this.user = JSON.parse(this.auth.getuserData());
  }

  
 public employeeFormCreate:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    department_id:new FormControl('',[Validators.required]),
    salary:new FormControl('',[Validators.required]),

  });

  public employeeFormEdit:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    department_id:new FormControl('',[Validators.required]),
    salary:new FormControl('',[Validators.required]),
    id:new FormControl('',[Validators.required])

  });



  getAllDepartments(){

    this.genericService.getAll('departments/index').subscribe(res=>{

        if(res.status == true){

            this.departments = res.data
        }

    });
  }

  
  getAllEmployees(){

    this.genericService.getAll('employees/index').subscribe(res=>{

        if(res.status == true){

            this.employees = res.data
        }

    });
  }

  create()
  {


    if(this.employeeFormCreate.valid){


     

      this.spinner.show();
        
      this.genericService.create('employees/store',this.employeeFormCreate.value).subscribe((response)=>{
        this.spinner.hide();
        console.log(response);
        if(response.status ==true){
          
          

          this.toaster.success(response.message);
          this.router.navigateByUrl('/employees')
          this.getAllEmployees();

          this.employeeFormCreate.reset()
      
          $('#createEmp').modal('hide');

        }
        else{

          this.toaster.error(response.message);
        }
      })



    }

  }


  showEmp(id:number){

      this.genericService.getByID('employees/show',id).subscribe(res=>{

        if(res.status == true){

          this.employee = res.data;

          this.setValueInEditForm();

          $('#editEmp').modal('show');
        }


      })

  }

  setValueInEditForm(){

      this.employeeFormEdit.controls['name'].setValue(this.employee.name);
      this.employeeFormEdit.controls['phone'].setValue(this.employee.phone);
      this.employeeFormEdit.controls['department_id'].setValue(this.employee.department.id);
      this.employeeFormEdit.controls['salary'].setValue(this.employee.salary);
      this.employeeFormEdit.controls['id'].setValue(this.employee.id);


  }

  update()
  {


    if(this.employeeFormEdit.valid){

      
     

      this.spinner.show();

        
      this.genericService.edit('employees/update',this.employeeFormEdit.value).subscribe((response)=>{
        this.spinner.hide();
        console.log(response);
        if(response.status ==true){
          
          

          this.toaster.success(response.message);
          this.router.navigateByUrl('/employees')
          this.getAllEmployees();

          this.employeeFormEdit.reset()
      
          $('#editEmp').modal('hide');

        }
        else{

          this.toaster.error(response.message);
        }
      })



    }

  }


  delete(id:number){

      this.genericService.delete('employees/delete',id).subscribe((res)=>{

        if(res.status ==true){

          this.router.navigateByUrl('/employees');
          this.getAllEmployees();

          this.toaster.success(res.message);
      }else{
        this.toaster.error(res.message);

      }


      });
  }

}
