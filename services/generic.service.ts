import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  // httpOptions;
  // baseUrlApi:string = "http://127.0.0.1:8000/api/";

  // private token:any ='';

  constructor(private httpClient: HttpClient, auth:AuthService) {


      
      // this.token =   auth.getAuthToken()
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //     ,Authorization: `Bearer ${this.token}`,
    //   })
    // };

   }



   getAll( apiEndPoind: string): Observable<any>
   {
     return this.httpClient.get(`${environment.baseUrl}/${apiEndPoind}`)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
   }


   getByID(apiEndPoind:string,id:number):  Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/${apiEndPoind}/${id}`);

  }

  create (apiEndPoind:string,model:object): Observable<any>
  {
    return this.httpClient
    .post(`${environment.baseUrl}/${apiEndPoind}`,model);


  }

  edit(apiEndPoind:string,model:object):  Observable<any>
  {
    return this.httpClient
    .post(`${environment.baseUrl}/${apiEndPoind}`,model);
  }


  delete (apiEndPoind:string,id:number): Observable<any>
  {

    return this.httpClient
    .delete(`${environment.baseUrl}/${apiEndPoind}/${id}`);

  }





   private handleError(error: HttpErrorResponse) {
    // Generic Error handler
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Write error details in Generic error log

    // Return an observable with a user-facing error message.
    return throwError(
      ()=>new Error('Error occured, please try again')
    )
  }

  }
