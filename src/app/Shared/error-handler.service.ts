import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }
  logError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.log('client side error', error);
    }else{
      console.log('server erroe', error);
    }
    return throwError('some thing went wrong');
  }
}
