import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})

export class OrganizationComponent implements OnInit {

  departmentLabel:string;
  locationLabel: string;
  jobLabel: string;

  constructor(private translateService:TranslateService) {
  }

  ngOnInit() {
    this.departmentLabel = this.translateService.instant('ORGANIZATION.department');
    this.locationLabel = this.translateService.instant('ORGANIZATION.location');
    this.jobLabel = this.translateService.instant('ORGANIZATION.job');
  }

}
