import { Injectable } from '@angular/core';

import {HttpClient , HttpHeaders} from '@angular/common/http'

import {BehaviorSubject, Observable, Subject, tap} from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userChange:Subject<any> =new Subject<any>()


  constructor(private _HttpClient:HttpClient) {


   }

  

  signUp(data:any):Observable<any>
  {

    return this._HttpClient.post(environment.baseUrl+'signUp',data);
  }

  signIn(data:any):Observable<any>
  {
    const headersToken ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //  'Cache-Control': 'no-cache'
      })
    };
    

    return this._HttpClient.post(environment.baseUrl+'signIn',data);
    
  }

 


  logout(token:any):Observable<any>
  {
    
    // const headersToken = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });

    return this._HttpClient.post(environment.baseUrl+'logout',null);
  }


    isLogedIn(){

      return localStorage.getItem('TOKEN')? true : false;
    
    }


    isGuest(){
      return !localStorage.getItem('TOKEN')?true:false;
    }

    getAuthToken() {

      return localStorage.getItem('TOKEN');

      }

      getuserData():any
      {
    
        return localStorage.getItem('user');
      }



}
