import { MaterialsService } from './../../services/materials.service';
import { Component, OnInit } from '@angular/core';
import { IMaterial } from '../../models/imaterial';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.css']
})
export class NewMaterialComponent implements OnInit {
  mat: IMaterial;
  constructor(private materialService: MaterialsService, private router: Router) { }

  ngOnInit(): void {
  }


  addMaterial(){
    // console.log(this.mat);
    this.materialService.addMaterial(this.mat)
    .subscribe(
      res => {this.router.navigateByUrl('/Materials'); },
      err => {console.log(err); }
    );
  }

}
