import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: 'Paints';

  constructor(private translateService: TranslateService){
    this.translateService.setDefaultLang('en');
    // tslint:disable-next-line: no-unused-expression
    this.translateService.use(localStorage.getItem('lang')) || 'en';
  }
}
