import { MaterialsService } from './../../services/materials.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { IMaterial } from '../../models/imaterial';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from '../../services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateDataTableService } from '../../services/update-data-table.service';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { FormErrorsService } from '../../services/form-errors.service';

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.css']
})
export class UpdateMaterialComponent implements OnInit {
  mat: IMaterial;

  private formValue: IMaterial;

  private recordId: number;
  private idColumn;
  private paginator;
  private dataSource;


  // This is a form group from FormBuilder.
  @ViewChild(AddEditFormComponent)
  private addEditForm: AddEditFormComponent;

  constructor(
    private materialService: MaterialsService,
    @Inject(MAT_DIALOG_DATA)  data,
    // Used in modal for close()
    public dialogRef: MatDialogRef<UpdateMaterialComponent>,
    private updateDatatableService: UpdateDataTableService,
    private messagesService: MessagesService,
    public formErrorsService: FormErrorsService,
  ) { }

    // ---- GET DATA BY ID ----


// Need to load the data after the form is rendered so ngOnInit didn't work.
// setTimeout is a hack to avoid ExpressionChangedAfterItHasBeenCheckedError

ngAfterViewInit() {
  setTimeout(() => {
    this.fetchRecord();
  }, 200);
}

public fetchRecord() {

  // this.recordId = this.data.recordId;
  // this.idColumn = this.data.idColumn;
  // this.paginator = this.data.paginator;
  // this.dataSource = this.data.dataSource;

  // Display the data retrieved from the data model to the form model.
  this.materialService.getRecordById(this.recordId)
      .subscribe(data => {
          this.fillForm(data);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          this.handleError(err);
        });
}



// Populate the form, called above in fetchRecord().

private fillForm(parsedData) {
  this.addEditForm.addEditMaterialForm.setValue({
    code: parsedData.code,
    name: parsedData.name,
    quantity: parsedData.quantity,
    price_per_kilo: parsedData.price_per_kilo,
    min_value: parsedData.min_value,
  });
  this.existingMaterial();
}



// ---- UPDATE ----  Called from edit-member.component.html

public update(formValue) {
  if (this.addEditForm.addEditMaterialForm.valid) {
    this.materialService.updateRecord(formValue)
    .subscribe(
      result => {
        // Update the table data view for the changes.
        this.updateDatatableService.updateDataTable(
          result, this.recordId, this.idColumn, this.paginator, this.dataSource, formValue);
        this.success();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
        this.handleError(err);
      }
    );
  }
}

// Check if the user_name field has a name already and set
//   the unique user name validation field to false so
//   it doesn't trigger validation until changed.

private existingMaterial() {
  if (this.addEditForm.addEditMaterialForm.controls['name']
      .value !== null) {
    this.addEditForm.inDatabase = false;
  } else {
    return null;
  }
}


// ---- UTILITIES ----


private reset() {
  this.addEditForm.addEditMaterialForm.reset();
}

private success() {
  this.messagesService.openDialog('Success', 'Database updated as you wished!');
}

private handleError(error) {
  this.messagesService.openDialog('Error em1', 'Please check your Internet connection.');
}

  ngOnInit(): void {

  }
  updateMaterial(){

  }

}
