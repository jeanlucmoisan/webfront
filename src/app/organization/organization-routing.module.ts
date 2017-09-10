import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { OrganizationComponent } from './organization.component';
import { DepartmentComponent } from './department/department.component';
import { EditDepartmentComponent } from './department/edit/edit-department.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'organization',
    component: OrganizationComponent,
    data: { title: extract('Organization')},
    children: [
      { path:'', redirectTo: 'department', pathMatch: 'full'},
      { path:'department', component:DepartmentComponent, children:[  
        { path:'edit-department/:id', component: EditDepartmentComponent, outlet:'edit-department-outlet'},
      ]}, 
      { path:'location', component:LocationComponent},

    ]
  }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OrganizationRoutingModule { }
