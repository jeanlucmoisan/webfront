import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})

export class OrganizationComponent implements OnInit {

  tabs = [
    { path:'department', label: ""},
    { path:'location', label: ""},
    { path:'job', label: ""}
  ];
  departmentTabLabel:string;
  locationTabLabel:string;
  jobTabLabel:string;

  constructor(private translate:TranslateService) {
  }

  ngOnInit() {
    this.departmentTabLabel = this.translate.instant('ORGANIZATION.department');
    this.locationTabLabel = this.translate.instant('ORGANIZATION.location');
    this.jobTabLabel = this.translate.instant('ORGANIZATION.job');
    this.tabs[0].label = this.departmentTabLabel;
    this.tabs[1].label = this.locationTabLabel;
    this.tabs[2].label = this.jobTabLabel;
  }

}
