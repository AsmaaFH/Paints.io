import { Component, OnInit } from '@angular/core';
import { IMaterial } from '../../models/imaterial';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.css']
})
export class NewMaterialComponent implements OnInit {
  mat: IMaterial;
  constructor() { }

  ngOnInit(): void {
  }


  addMaterial(){
    // console.log(this.mat);
    /*this.materialService.addMaterial(this.mat)
    .subscribe(
      res => {this.router.navigateByUrl('/Materials/Material'); },
      err => {console.log(err); }
    );*/
  }

}
