import { IMaterial } from './../models/imaterial';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from 'src/app/Shared/error-handler.service';
import { catchError, map, tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  materials: IMaterial[];
  constructor(private httpClient: HttpClient, private errorHandlerService: ErrorHandlerService) {
this.materials = [
    {name: 'material1', code: 's8403', price_per_kilo: 6232, quantity: 64532, min_value: 2334},
    {name: 'material2', code: 'k8339', price_per_kilo: 5232, quantity: 453, min_value: 5344},
    {name: 'material3', code: 'h9273', price_per_kilo: 3232, quantity: 64532, min_value: 534},
    {name: 'material4', code: 'y6d38', price_per_kilo: 1129, quantity: 64532, min_value: 7334},
    {name: 'material5', code: 'l8372', price_per_kilo: 322, quantity: 64532, min_value: 2334},
    {name: 'material6', code: 'b3282', price_per_kilo: 1232, quantity: 453, min_value: 5344},
    {name: 'material7', code: 'p9392', price_per_kilo: 9232, quantity: 64532, min_value: 534},
    {name: 'material8', code: 'g9292', price_per_kilo: 8232, quantity: 64532, min_value: 7334}
  ];
 }
// ----------------- CRUD -------------------

  // --------------GET ALL RECORDS ------------
  // public getAllRecords(): Observable<any> {
  //   return this.httpClient.get<IMaterial>(environment.API_URL + '/get').pipe(
  //     catchError((error: any) => {
  //          console.error(error);
  //          return of();
  //        }),
  //   );
  // }

  // ------------- For Dummy Data --------------

  public getAllRecords(){
    return this.materials;
  }

  // ----------- CREATE new record -----------

  public addRecord(recordData): Observable<any> {
    return this.httpClient.post(environment.API_URL, recordData).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  // ---------- EDIT AND UPDATE --------------

  // ---- FETCH record detail for editing or viewing. ----

  public getRecordById(recordId): Observable<any> {
    return this.httpClient.get<any>(`${environment.API_URL}/${recordId}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  // ---- UPDATES an existing record ----

  public updateRecord(recordUpdate): Observable<any> {
    return this.httpClient.put(environment.API_URL, recordUpdate, httpOptions).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  public deleteRecord(code): Observable<any> {
    return this.httpClient.delete(environment.API_URL + '/' + code);
  }

  // search by name
  public nameSearch(terms) {
    return terms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => {
          const url = `${environment.API_URL}/materials/?name=${term}`;
          return this.httpClient.get(url);
      }),
      catchError((error: any) => {
           console.error(error);
           return of();
      }),
    );
  }

}

