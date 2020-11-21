import { Component, OnInit } from '@angular/core';
import { Factory } from '../factory';
import { FactoryService } from '../factory.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  factory: Factory;
  // tslint:disable-next-line: align
  constructor(private factoryService: FactoryService) { }

  ngOnInit(): void {
    this.factory = this.factoryService.getFactoryInfo();

  }

}
