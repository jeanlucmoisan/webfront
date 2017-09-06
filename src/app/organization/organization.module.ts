import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentService } from './department/department.service';
import { LocationComponent } from './location/location.component';
import { LocationService } from './location/location.service';

import { CovalentMessageModule } from '@covalent/core';
import { CovalentDataTableModule } from '@covalent/core';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    AgmCoreModule,
    OrganizationRoutingModule,
    CovalentMessageModule,
    CovalentDataTableModule
  ],
  declarations: [
    OrganizationComponent,
    DepartmentComponent,
    LocationComponent
  ],
  providers: [
    DepartmentService,
    LocationService
  ]
})
export class OrganizationModule { }
