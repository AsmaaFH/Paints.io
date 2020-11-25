import { MaterialsService } from './../../services/materials.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMaterial } from '../../models/imaterial';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MessagesService } from '../../services/messages.service';
import { FormErrorsService } from '../../services/form-errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.css']
})
export class NewMaterialComponent implements OnInit {

  addFrm: FormGroup;
  material: IMaterial;
  constructor(private fb: FormBuilder, private materialsService: MaterialsService,
              private activateRoute: ActivatedRoute , private router: Router){
    this.addFrm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price_per_kilo: ['', [Validators.required]],
      min_value: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }
  addMaterial(){
    console.log(this.addFrm.value);
    this.materialsService.addRecord(this.addFrm.value)
    .subscribe(
      res => {this.router.navigateByUrl('/materials'); },
      err => {console.log(err); }
    );
  }

  clearForm(){
    this.material = {code: '', name:  '' , quantity: '' , price_per_kilo: '' , min_value: '' };
  }
}

