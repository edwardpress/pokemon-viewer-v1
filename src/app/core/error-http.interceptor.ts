import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {

  constructor(private toast: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';

          if (error.status === 401){
            errorMsg = `Status: ${error.status} Unathorized Access. Please try again later`;
          } else if(error.status === 404){
            errorMsg = `Status: ${error.status} The url you requested does not exist. Please try again later`;
          } else if (error.status === 500){
            errorMsg = `Status: ${error.status} Something is wrong from our end, please try again later`;

          }
          else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }

          this.toast.open(errorMsg, "Dismiss",{
            duration: 5000,
            verticalPosition: 'top'
          });

          return throwError(()=>new Error(errorMsg));
        })
      )
  }

}
