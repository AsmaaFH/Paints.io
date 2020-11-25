import { LoginComponent } from './Users/components/login/login.component';
import { UpdateMaterialComponent } from './materials/components/update-material/update-material.component';
import { NewMaterialComponent } from './materials/components/new-material/new-material.component';
import { MaterialsListComponent } from './materials/components/materials-list/materials-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Materials', component: MaterialsListComponent},
  {path: 'Material', component: NewMaterialComponent},
  {path: 'Material/:code', component: UpdateMaterialComponent},
  // { path: '',  redirectTo: '/Materials', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
