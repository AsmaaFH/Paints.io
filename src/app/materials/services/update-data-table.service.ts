import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataTableService {

  constructor() { }

  public updateDataTable(
    updatedData, recordId, idColumn, paginator, dataSource,
    formValue) {
    const dsData = dataSource.data;
    // Add the item id (material_id) back to data object for re-edits without refreshing from db.
    const itemId = idColumn + ': ' + recordId;
    formValue[idColumn] = recordId;


    // Find the data object's index number.
    const itemIndex = dsData.findIndex(obj => obj[idColumn] === recordId);
    // Update properties of item in a Mat Table row by deleting the selected item and adding data to same index.
    dataSource.data.splice(itemIndex, 1, formValue);
    dataSource.paginator = paginator;
  }
}
