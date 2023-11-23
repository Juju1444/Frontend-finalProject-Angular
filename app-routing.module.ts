import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DepartmentComponent } from './components/department/department.component';
import { GuestGuard } from './Guards/guest.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  {path :'',redirectTo:'home',pathMatch:'full'},
  { path : 'home', component:HomeComponent },
  { path : 'departments', component:DepartmentComponent },
  { path : 'login', component:LoginComponent },
  { path : 'register', component:RegisterComponent },
  {path : 'employees', component:EmployeeComponent},
  {path:'**',redirectTo:'home', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
