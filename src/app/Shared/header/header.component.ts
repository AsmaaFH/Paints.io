import { Component, OnInit } from '@angular/core';
import { Factory } from '../factory';
import { FactoryService } from '../factory.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

factory: Factory;

constructor( private factoryService: FactoryService) { }

ngOnInit(): void {
  this.factory = this.factoryService.getFactoryInfo();
}
}
