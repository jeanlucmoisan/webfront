import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { FlexLayoutModule, } from '@angular/flex-layout';
import {
  MdButtonModule, MdCardModule, MdIconModule,
  MdListModule, MdMenuModule, MdTooltipModule,
  MdSlideToggleModule, MdInputModule, MdCheckboxModule,
  MdToolbarModule, MdSnackBarModule, MdSidenavModule,
  MdTabsModule, MdSelectModule, MdTableModule, MdPaginatorModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { NgxChartsModule, } from '@swimlane/ngx-charts';
import { DirectedGraphModule } from './directed-graph/directed-graph.module';
import { LoaderComponent } from './loader/loader.component';

const FLEX_LAYOUT_MODULES: any[] = [
  FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule,
];

const MATERIAL_MODULES: any[] = [
  MdButtonModule, MdCardModule, MdIconModule,
  MdListModule, MdMenuModule, MdTooltipModule,
  MdSlideToggleModule, MdInputModule, MdCheckboxModule,
  MdToolbarModule, MdSnackBarModule, MdSidenavModule,
  MdTabsModule, MdSelectModule, MdTableModule, CdkTableModule, MdPaginatorModule
];

const CHART_MODULES: any[] = [
  NgxChartsModule,
  DirectedGraphModule
];


@NgModule({
  imports: [
    CommonModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    CHART_MODULES,
    FLEX_LAYOUT_MODULES
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    CHART_MODULES,
    FLEX_LAYOUT_MODULES,
    LoaderComponent
  ]
})
export class SharedModule { }
