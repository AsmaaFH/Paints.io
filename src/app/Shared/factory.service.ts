import { Injectable } from '@angular/core';
import { Factory } from './factory';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

Factory: Factory;
constructor() {
  this.Factory = {name: 'Factory1', img: 'assets/images/paint_logo-12.jpg'};
}

getFactoryInfo(){
  return this.Factory;
}
}
