import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MaterialsService } from './materials.service';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueNameService {

  public inDatabase = new BehaviorSubject<boolean>(false);

  constructor(   private materialsService: MaterialsService, private messagesService: MessagesService) { }

  public validateUsername(name) {

    return this.materialsService.validateUsername(name)
    .subscribe(res => {
      const extractedName = res.map(x => x.name); // Creates an array with name. This works with other setups: = Object.values(res);

      // Convert from array to string.
      const convertedName = extractedName.toString();

      return convertedName === name ?
          this.inDatabase.next(true) : null;

    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
        this.messagesService.openDialog('Error', 'Delete did not happen.');
      }
    );
}
}
