import { Component, OnInit } from '@angular/core';
import { IMaterial } from '../../models/imaterial';

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.css']
})
export class UpdateMaterialComponent implements OnInit {
  mat: IMaterial;

  constructor() { }

  ngOnInit(): void {
  }
  updateMaterial(){

  }

}
