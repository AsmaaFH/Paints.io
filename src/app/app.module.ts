import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialsListComponent } from './materials/components/materials-list/materials-list.component';
import { NewMaterialComponent } from './materials/components/new-material/new-material.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FilterPipe } from './materials/pipes/filter.pipe';
import { UpdateMaterialComponent } from './materials/components/update-material/update-material.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialsListComponent,
    NewMaterialComponent,
    SidebarComponent,
    HeaderComponent,
    FilterPipe,
    UpdateMaterialComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    Ng2SearchPipeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
