import { IMaterial } from './../../models/imaterial';
import { MaterialsService } from './../../services/materials.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { orderBy, SortDescriptor, State } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { MessagesService } from '../../services/messages.service';
import { MatPaginator } from '@angular/material/paginator';
import { NewMaterialComponent } from '../new-material/new-material.component';
import { UpdateMaterialComponent } from '../update-material/update-material.component';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css']
})

export class MaterialsListComponent implements OnInit{
  private idColumn = 'id';
  private dbTable = 'members';
  private materialsUrl = 'api/material';

  private dsData: any;

   dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataLength: number;
  private newMaterialComponent = NewMaterialComponent;
  private updateMaterialComponent = UpdateMaterialComponent;
  public addEditMaterialForm: FormGroup;

  private idArray: number[] = [];  // Create array for checkbox selection in table.
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

  // For last name query
  public searchTerm$ = new Subject<string>();
  constructor(
    private materialsService: MaterialsService,
    public dialog: MatDialog,
    private confirmService: ConfirmDialogService,
    private messagesService: MessagesService,
    private fb: FormBuilder
    ) {}

    ngOnInit(): void {
      this.MaterialList = this.materialsService.getAllRecords();
      this.dataSource = this.MaterialList;
      console.log('data' + this.dataSource);
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }


  /*  The Angular Material Data Table docs recommended http with paginator setup below reloads the earlier query when the user alternates between multiple queries in one view.  More queries on the page makes this worse fast.  My suggested code here works.

  */
  /*
    private getAllRecords(): any {
      // Kills the paginator if omitted.
      this.dataSource.paginator = this.paginator;

      merge(this.paginator.page).pipe(
        // Tap called only with page forward.
        tap(val => console.log('page forward in getAllRecords')),
        startWith(null),  // Delete this and no data is downloaded.
        switchMap(() => {
          console.log('paginator.pageIndex: ', this.paginator.pageIndex);
          console.log('paginator.length: ', paginator.length);  // Should show all records for the second page, index 1.
          return this.httpService.getAllRecords(this.materialsUrl);
        }),
      )

      .subscribe(data => {
        this.dataLength = data.length;
        this.dataSource.data = data;
      },
      (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.message);
      });
    }
  */

    // -------------- CRUD ----------------------


    // ----------------- GET ALL ------------------

    //  This works fine when multiple queries used.
    // public getAllRecords(): any {
    //     this.materialsService.getAllRecords()
    //     .subscribe(data => {
    //       this.dataLength = data.length;
    //       this.dataSource.data = data;
    //     });
    //   }

    // ------------ Dummy Data ------------

    getAllRecords(){

    }
    prepareForm(){
      this.addEditMaterialForm = this.fb.group({
        code: ['', [Validators.required]],
        name: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
        price_per_kilo: ['', [Validators.required]],
        min_value: ['', [Validators.required]]
        });
    }
    // ------------------ ADD --------------------


    public addRecord() {
      this.dialog.open(this.newMaterialComponent);
    }


    // ----------- EDIT & UPDATE --------------

    public editRecord(recordId) {

      this.dialog.open(this.updateMaterialComponent, {

         data: {code: recordId.code, name: recordId.name, quantity: recordId.quantity, price_per_kilo: recordId.price_per_kilo}
      });
      console.log(recordId);

    }




  // --------------- DELETE ------------------

    public deleteRecord(recordCode) {
      const dsData = this.dataSource;

      // For delete confirm dialog in deleteItem to match the db column name to fetch.
      const Dname = 'name';
      const record = dsData.find(obj => obj[this.idColumn] === recordCode);
      const nameToDelete = 'Delete ' + record[Dname] + '?';

     // const url = `${this.materialsUrl}/${recordId}`;

      // Call the confirm dialog component
      this.confirmService.confirm(nameToDelete, 'This action is final. Gone forever!').pipe(
        switchMap(res => {if (res === true) {
          return this.materialsService.deleteRecord();
        }}))
        .subscribe(
          result => {
            this.success();
            // Refresh DataTable to remove row.
            this.deleteRowDataTable (recordCode, this.idColumn, this.paginator, this.dataSource);
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            console.log(err.message);
            this.messagesService.openDialog('Error', 'Delete did not happen.');
          }
        );
    }

  // Remove the deleted row from the data table. Need to remove from the downloaded data first.
    private deleteRowDataTable(recordId, idColumn, paginator, dataSource) {
      this.dsData = dataSource.data;
      const itemIndex = this.dsData.findIndex(obj => obj[idColumn] === recordId);
      dataSource.data.splice(itemIndex, 1);
      dataSource.paginator = paginator;
    }

    // -------------- SELECT BOX ------------------


    // Called each time a checkbox is checked in the mat table.
    public selectMember(selectedMember) {
      // push the id's into an array then call it with the button.
      return this.idArray.push(selectedMember);
    }
    //   |
    //   |
    //   |
    //   V

    // Called by the Show Selected button.
    public getAllSelected() {
      this.MaterialList = [];
      const tempArray = [];
      const ds = this.dataSource.data;
      const property = 'code';

      this.idArray.forEach(function (id, i) {

        // Need to match ids in idArray with dataSource.data.
         const materialId: number = id;  // Extracts member id from selection array.

        // Search dataSource for each member_id and push those selected into a new data object.
         // tslint:disable-next-line: only-arrow-functions
         ds.forEach(function(material, index) {

          if (ds[index][property] === materialId) {
            tempArray.push(material);
          }
        });
      });

      this.idArray = []; // Empty the array for next query.
      this.MaterialList = tempArray;
      this.paginator.pageIndex = 0;
      this.dataSource.data = this.MaterialList;
    }

  // -----------  UTILITIES ------------------


    private success() {
      this.messagesService.openDialog('Success', 'Database updated as you wished!');
    }

    private handleError(error) {
      this.messagesService.openDialog('Error', 'No database connection.');
    }


  }


