import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private dialogRef: MatDialogRef<ConfirmComponent>;

  constructor(private dialog: MatDialog) { }


  confirm(title: string, message: string): Observable<any> {

    this.dialogRef = this.dialog.open(ConfirmComponent);
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.message = message;

    return this.dialogRef.afterClosed();

  }
}
