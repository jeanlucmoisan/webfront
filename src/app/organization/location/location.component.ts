import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TdDataTableService, ITdDataTableColumn, IPageChangeEvent } from '@covalent/core';

import { LocationService } from './location.service';
import { Location } from './../../models/location.model';
import { MapStyles } from './../../../assets/mapstyle.json';

@Component({
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {
  
  // gmap content
  mapstyle = MapStyles;
  locations: Location[] = [];
  positions: any[] = [];

  // dataTable content
  columns: ITdDataTableColumn[] = [
    { name:'name', label:'locations'}
  ];
  filteredData: any[] = this.locations;
  filteredTotal: number = this.locations.length;
  currentPage: number = 1;
  pageSize: number = 5;
  searchTerm: string = '';
  fromRow: number = 1;

  constructor(private locationService: LocationService, private _dataTableService: TdDataTableService, private translateService:TranslateService) {
  }

  ngOnInit() {
    this.columns[0].label = this.translateService.instant('LOCATION.locations');
    this.locationService.getAllLocations()
      .subscribe((locations:Location[]) => { 
        this.locations = locations;
        this.locations.forEach(loc => {
          if (loc.lat != "") {
            var position = {"lat":Number(loc.lat),"lon":Number(loc.lon)};
            this.positions.push(position);
          }
        });
        this.filter();
      });
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.locations;
    let excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }
}
