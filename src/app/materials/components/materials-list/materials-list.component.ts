import { IMaterial } from './../../models/imaterial';
import { MaterialsService } from './../../services/materials.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { orderBy, SortDescriptor, State } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css']
})
export class MaterialsListComponent implements OnInit {

  constructor(private materialService: MaterialsService, private formBuilder: FormBuilder) {
  }
  index: number ;
  // grid
  public pageSize = 10;
  public skip = 0;
  public multiple = false;
  public sort: SortDescriptor[] = [{
    field: 'ProductName',
    dir: 'asc'
  }];
  public gridView: GridDataResult;
  private data: IMaterial[];
  private items: any[] ;
  // data
  materialsList: IMaterial[];
  private subscriptions: Subscription[];

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadMaterials();
  }
  private loadMaterials(): void {
      this.gridView = {
          data: orderBy(this.materialsList , this.sort),
          total: this.materialsList.length
      };
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
  private loadItems(): void {
    this.gridView = {
        data: this.items.slice(this.skip, this.skip + this.pageSize),
        total: this.items.length
    };
  }
  ngOnInit(): void {
    // this.subscriptions.push(this.materialService.getAllMaterials().subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.materialsList = response;
    //   },
    //   (err) => {console.log(err); }
    // ));
    // console.log('After Subscribe....');

    this.materialsList = this.materialService.getAllMaterialsDummy();
    this.loadMaterials();
  }

  deleteMaterial(id){
    this.materialService.deleteMaterial(id);
  }
  AddMaterial(material: IMaterial){
    this.materialService.addMaterial(material).subscribe((res) => {
      console.log(res);
    });
  }
  upadateMaterial(material: IMaterial){
    this.materialService.updatePost(material).subscribe((res) => {
      console.log(res);
    });
  }

}
