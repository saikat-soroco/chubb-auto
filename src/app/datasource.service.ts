import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { CommonService } from './common.service';
@Injectable()
export class DatasourceService {

  constructor(private _http: Http, private _commonService: CommonService) { }

  getLoggedinUser() {
    return this._http.get('/v1.0/api/user/loggedin-user').map((response) => {
      return response.json();
    });
  }

  getTodaysWorkOrder(context, dateFrom: string, dateTo: string) {
    // return this._http.get('/assets/mock-data/todays-data.json').map(res => res.json());
    return this._http.get('/v1.0/api/v1.0/api/data/14/row?no-cached=true&book_type=' + context.toLowerCase() + '&start_date=' + dateFrom + '&end_date=' + dateTo).map((response) => {
      return response.json();
    });
  }

  getEndorsements(context, dateFrom: string, dateTo: string) {
    return this._http.get('/v1.0/api/data/auto_endorsement_workorders/row?no-cached=true&' + '&start_date=' + dateFrom + '&end_date=' + dateTo).map((response) => {
      return response.json();
    });
  }

  getSubEndorsementData(masterId) {
    return this._http.get('/v1.0/api/data/auto_endorsement_children/row?no-cached=true&' + '&master_id=' + masterId).map((response) => {
      return response.json();
    });
  }

  getDownloadFilename(dateFrom: string, dateTo: string) {
    return this._http.get('/v1.0/api/data/generate_excel/row?no-cached=true' + '&start_date=' + dateFrom + '&end_date=' + dateTo).map((response) => {
      return response.text();
    });
  }

  getWorkOrderCreationStatus(context, dateFrom: string, dateTo: string): Observable<any> {
    /*console.log('getWorkOrderCreationStatus -- start date: ' + dateFrom + '; end date: ' + dateTo);
    if (dateFrom == dateTo) {
       return of([
        {
          '2018-06-05': {
            'COMPLETED': 81,
            'FAILED': 44,
            'PENDING': 0,
            'NOT FOUND': 0,
            'NOT IN SCOPE': 0
          }
        }
      ]);
    } else {
      return of([
        {

          '2018-05-09': {
            'COMPLETED': 100,
            'FAILED': 14,
            'PENDING': 0,
            'NOT FOUND': 0,
            'NOT IN SCOPE': 0
          }
        }, {
          '2018-05-13': {
            'COMPLETED': 71,
            'FAILED': 32,
            'PENDING': 0,
            'NOT FOUND': 0,
            'NOT IN SCOPE': 0
          }
        }, {
          '2018-05-15': {
            'COMPLETED': 81,
            'FAILED': 44,
            'PENDING': 0,
            'NOT FOUND': 0,
            'NOT IN SCOPE': 0
          }
        }
      ]);
    } */

    // const end = this._commonService.getToday();
    // const start = this._commonService.getFiveDayAgo();

    // return of([{"09/20/2018": {
    // 'FAILED': 1,
    // 'INPROCESS': 1}}]);
    return this._http.get('/v1.0/api/data/auto_endorsement_cases/row?no-cached=true&start_date='
      + dateFrom + '&end_date=' + dateTo + '&book_type=' + context.toLowerCase()).map((response) => {
        return response.json();
      });
  }

  getAveragehandlingTime(context, dateFrom: string, dateTo: string) {
    /* if (dateFrom == dateTo) {
      return of([
        {
          processing_date: '2018-05-15',
          avg: 12
        }
      ]);
    } else {
      return of([
        {
          processing_date: '2018-05-09',
          avg: 5
        },
        {
          processing_date: '2018-05-13',
          avg: 12
        },
        {
          processing_date: '2018-05-15',
          avg: 20
        }
      ]);
    } */

    return this._http.get('/v1.0/api/data/auto_endorsement_aht/row?no-cached=true&book_type=' + context.toLowerCase() + '&start_date=' + dateFrom + '&end_date=' + dateTo).map((response) => {
      return response.json();
    });
  }

  getPostProcessingTime(context, dateFrom: string, dateTo: string) {
    return this._http.get('/v1.0/api/v1.0/api/data/15/row?no-cached=true&book_type=' + context.toLowerCase() + '&start_date=' + dateFrom + '&end_date=' + dateTo).map((response) => {
      return response.json();
    });
  }

  fetchStats(context, dateFrom: string, dateTo: string): Observable<any> {
    return this._http.get("/v1.0/api/data/auto_endorsement_general_statistics/row?no-cached=true" + '&start_date=' + dateFrom + '&end_date=' + dateTo)
      .map(response => response.json());
  }

}
