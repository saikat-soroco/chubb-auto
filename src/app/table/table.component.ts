import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClrDatagridStringFilterInterface } from '@clr/angular';
import { DatasourceService } from '../datasource.service';
import { CommonService } from '../common.service';

class GenericStringFilter implements ClrDatagridStringFilterInterface<any> {
  colName: string;

  constructor(colName) {
    this.colName = colName;
  }
  accepts(record: any, search: string): boolean {
    if (!record[this.colName]) {
      return;
    }
    return '' + record[this.colName] === search
      || record[this.colName].toString().toLowerCase().indexOf(search) >= 0;
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, OnDestroy {
  @Input()
  datePicker: boolean;
  @Input()
  tableTitlePrefix: string = 'Current day - Work Order Status for ';

  dateFrom: string;
  dateTo: string;
  selectedDateFrom: string;
  selectedDateTo: string;
  constructor(private _activatedRoute: ActivatedRoute, private _datasource: DatasourceService, public _commonService: CommonService) {
    this._activatedRoute.params.subscribe((params) => {
      this._commonService.setContext(params['context']);
      this.refreshData();
    });
  }
  keyCols = [];

  displayRecordData = [];

  keyColNames = [];
  showAllCols;
  columnFilters: object = {};
  refreshTimeout;

  refreshData() {
    this.displayRecordData = [];
    const dateFrom = (this.selectedDateFrom) ? this.formatClrDate(this.selectedDateFrom) : this._commonService.getToday();
    const dateTo = (this.selectedDateTo) ? this.formatClrDate(this.selectedDateTo) : this._commonService.getToday();
    this._datasource.getEndorsements(this._commonService.getContext(), dateFrom, dateTo).subscribe((records) => {
      records.forEach((record, index) => {
        record.serial = index + 1;
      });
      this.displayRecordData = records;
      this.keyColNames = this.displayRecordData.length ? Object.keys(this.displayRecordData[0]).slice(1) : [];

      this.keyColNames.forEach((col) => {
        this.columnFilters[col] = new GenericStringFilter(col);
      });
      
      this.keyColNames.unshift(this.keyColNames.pop());

      this.keyCols = this.keyColNames.map((col) => {
        if (col) {
          let words;
          words = col.toString().split('_');
          words[0] = words[0].charAt(0).toUpperCase() + words[0].substr(1);
          if (words[1]) {
            words[1] = words[1].charAt(0).toUpperCase() + words[1].substr(1);
          }
          return words.join(' ');
        } else {
          return 'NA';
        }
      });
    });
    
    console.log(this.keyColNames)

    this.refreshTimeout = setTimeout(() => {
      this.refreshData();
    }, 300000);
  }

  formatClrDate(date) {
    const dateArr = date.split('/'),
      month = dateArr[0],
      day = dateArr[1],
      year = dateArr[2]
      ;
    return year + '-' + month + '-' + day;
  }

  ngOnInit() {
    setTimeout(() => {
      document.querySelector('.datagrid-host')['style'] = '';
    }, 100);
  }



  onDateFromChange(val) {
    this.selectedDateFrom = val;
    if (this.validateDates()) {
      this.refreshData();
    }
  }

  onDateToChange(val) {
    this.selectedDateTo = val;
    if (this.validateDates()) {
      this.refreshData();
    }
  }

  validateDates(): boolean {
    if (!this.selectedDateFrom || !this.selectedDateTo) {
      return false;
    }
    const fromDate = new Date(this.formatClrDate(this.selectedDateFrom));
    const toDate = new Date(this.formatClrDate(this.selectedDateTo));

    if (isNaN(toDate.valueOf()) || isNaN(fromDate.valueOf())) {
      console.log('Invalid ' + toDate);
      return false;
    }

    if (fromDate > toDate) {
      const temp = this.selectedDateFrom;
      this.selectedDateFrom = this.dateFrom = this.selectedDateTo;
      this.selectedDateTo = this.dateTo = temp;
    }
    return true;
  }

  downloadData() {
    const dateFrom = (this.selectedDateFrom) ? this.formatClrDate(this.selectedDateFrom) : this._commonService.getToday();
    const dateTo = (this.selectedDateTo) ? this.formatClrDate(this.selectedDateTo) : this._commonService.getToday();
    this._datasource.getDownloadFilename(dateFrom, dateTo).subscribe((filename) => {
      const getUrl = window.location;
      const baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
      window.open(baseUrl + 'static/' + filename.replace(/\"/g, "").replace(/\'/g, ""), '_blank');
    });
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
  }
}
