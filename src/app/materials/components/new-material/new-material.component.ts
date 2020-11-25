import { MaterialsService } from './../../services/materials.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMaterial } from '../../models/imaterial';
import { Router } from '@angular/router';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MessagesService } from '../../services/messages.service';
import { FormErrorsService } from '../../services/form-errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.css']
})
export class NewMaterialComponent implements OnInit {

  @ViewChild(AddEditFormComponent)

  public newMaterialForm: AddEditFormComponent;

  private membersUrl = 'api/members';
  private dbTable = 'members';

  constructor(
    private materialsService: MaterialsService,
    public dialogRef: MatDialogRef<NewMaterialComponent>,  // Used by the html component.
    private messagesService: MessagesService,
    public formErrorsService: FormErrorsService,
  ) { }
  ngOnInit(): void {
  //  throw new Error('Method not implemented.');
  }

  reset() {
    this.newMaterialForm.addEditMaterialForm.reset();
  }

  //  Processes form data and sends it to the server and db.

  public save(addForm) {
    let entity = new IMaterial();
    entity = addForm.addEditMaterialForm.value;

    this.materialsService.addRecord(entity)
    .subscribe(
      res => {
        this.success();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
        this.handleError(err);
      }
    );
    addForm.addEditMemberForm.reset();
  }


  private success() {
    this.messagesService.openDialog('Success', 'Database updated as you wished!');
  }

  private handleError(error) {
    this.messagesService.openDialog('Error addm1', 'Please check your Internet connection.');
  }


  // addMaterial(){
  //   // console.log(this.mat);
  //   this.materialService.addRecord()
  //   .subscribe(
  //     res => {this.router.navigateByUrl('/Materials'); },
  //     err => {console.log(err); }
  //   );
  // }

}

