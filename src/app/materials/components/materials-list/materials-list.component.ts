import { IMaterial } from './../../models/imaterial';
import { MaterialsService } from './../../services/materials.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessagesService } from '../../services/messages.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css']
})

export class MaterialsListComponent implements OnInit{

  dataSourceFilter: MatTableDataSource<IMaterial>;

  dataSource: IMaterial[];
  textSearch;
  private MaterialList = [];

  public displayedColumns = [
      'select',
      'Code',
      'Name',
      'Quantity',
      'price_per_kilo',
      'Min Value',
      'options'
  ];
  constructor(
    private materialsService: MaterialsService,
    public dialog: MatDialog,
    private messagesService: MessagesService,
    private fb: FormBuilder
    ) {}

  ngOnInit(): void {
    this.MaterialList = this.materialsService.getAllRecords();
    this.dataSource = this.MaterialList;
    this.dataSourceFilter = new MatTableDataSource(this.MaterialList);

  }

  deleteMaterial(material){
  if (confirm('Are you sure to delete')) {

  // console.log(material);
  this.materialsService.deleteRecord(material.code)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(item => item.code !== material.code);
      });
  this.dataSource = this.dataSource.filter(item => item.code !== material.code);
}
}

Search(): IMaterial[] {
  if (!this.dataSource) { return []; }
  if (this.textSearch === '') { return this.dataSource; }
  return this.dataSource.filter(item => {
    return Object.keys(item).some(key => {
      return String(item[key]).toLowerCase().includes(this.textSearch.toLowerCase());
    });
  });
}

  Search1(){
    console.log(this.dataSource.forEach(element => {element.name.toLowerCase().includes(this.textSearch.toLowerCase()); }));
  }
  // clearSearch(){
  //   this.dataSource = this.materialsService.getAllRecords();
  // }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceFilter.filter = filterValue;
  }
}
