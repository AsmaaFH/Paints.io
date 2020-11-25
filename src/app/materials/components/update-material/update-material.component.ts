import { MaterialsService } from './../../services/materials.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { IMaterial } from '../../models/imaterial';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from '../../services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateDataTableService } from '../../services/update-data-table.service';
import { FormErrorsService } from '../../services/form-errors.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.css']
})
export class UpdateMaterialComponent implements OnInit {
  EditForm: FormGroup;
  materialToEdit: IMaterial;
  constructor(private fb: FormBuilder, private materialsService: MaterialsService,
              private activateRoute: ActivatedRoute , private router: Router){
    this.EditForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price_per_kilo: ['', [Validators.required]],
      min_value: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.materialToEdit = this.materialsService.getAllRecords().find(mat => mat.code == params.code);
      console.log(this.materialToEdit);
      console.log(params.code);
    });
  }

  EditMaterial(){
    this.materialsService.updateRecord(this.EditForm.value);
    console.log(this.EditForm.value);
    this.materialToEdit = this.EditForm.value;
    this.router.navigateByUrl('/Materials');

  }

  clearForm(){
    this.materialToEdit = {code: this.activateRoute.params, name:  '' , quantity: '' , price_per_kilo: '' , min_value: '' };
  }

}

