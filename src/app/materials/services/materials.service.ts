import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  IMaterial } from '../models/imaterial';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from 'src/app/Shared/error-handler.service';

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

 getAllMaterials(): Observable<IMaterial[]>{
  return this.httpClient.get<IMaterial[]>(`${environment.API_URL}/getmaterials`);
}

getMaterialByCode(matCode: number): Observable <IMaterial>{
  return this.httpClient.get<IMaterial>(`${environment.API_URL}/getmaterial/${matCode}`);
}

addMaterial(material: IMaterial) {
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // ,'Authorization': 'my-auth-token'
      })};
  return this.httpClient.post(`${environment.API_URL}/post`, material);
}

updatePost(material: IMaterial) {
  return this.httpClient.put(`${environment.API_URL}/put`, material).pipe(catchError(this.errorHandlerService.logError));
}

deleteMaterial(id){
  return this.httpClient.delete(environment.API_URL + '/' + id);
}

getAllMaterialsDummy(){
  return this.materials;
}
getProductByCodeDummy(mCode: number): IMaterial{
  return this.materials.find((mat) => mat.code === mCode);
}

getFakeApi(){
  return this.httpClient.get(`${environment.API_URL}/get`);
}

}
