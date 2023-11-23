import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:AuthService , private router:Router) { }

  ngOnInit(): void {
  }


  logout(){

    localStorage.removeItem('TOKEN');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

}
