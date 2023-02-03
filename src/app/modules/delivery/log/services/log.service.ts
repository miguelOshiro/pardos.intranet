import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DriverLogQueryModel } from '../models/driver-log-query.model';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { HttpClient } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;


@Injectable({
  providedIn: 'root'
})
export class LogService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAllLogsByManagementId(managementId: string, startDate: any, endDate: any): Observable<DriverLogQueryModel[]> {
    console.log(managementId, startDate, endDate);
    this.isLoadingSubject.next(true);
    return this.http.get<BaseResponse<DriverLogQueryModel[]>>
      (`${API_DELIVERY_URL}/management/${managementId}/schedule/logs?startdate=${startDate}&enddate=${endDate}`).pipe(
        map((response: BaseResponse<DriverLogQueryModel[]>) => {
          if (!response.isSuccess) {
            console.log(response.exception);
            console.log(response.errors);
          }
          console.log(response.message);

          return response.data;
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  getExportDriver(managementId: string, startDate: any, endDate: any) {
    return this.http.get(`${API_DELIVERY_URL}/management/${managementId}/schedule/export?startdate=${startDate}&enddate=${endDate}`,
      { responseType: 'blob' }
    );
  }
}
