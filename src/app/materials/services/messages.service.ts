import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MessagesComponent } from '../components/messages/messages.component';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  dialogRef: MatDialogRef<MessagesComponent>;

  constructor(private dialog: MatDialog) { }

  public openDialog(title: string, message: string): Observable<any> {
    this.dialogRef = this.dialog.open(MessagesComponent);
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.message = message;

    return this.dialogRef.afterClosed();
  }
}
