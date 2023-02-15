import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HistoryModel } from '../models/history.model';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { environment } from 'src/environments/environment';
import { map, finalize } from 'rxjs/operators';
import { PaginateResponseModel } from '../../../../shared/models/paginateresponse.model';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAllHistoriesByManagementId(pageNumber: number, pageSize: number, managementId: string, startDate: any, endDate: any): Observable<PaginateResponseModel<HistoryModel[]>> {
    this.isLoadingSubject.next(true);
    return this.http.get<BaseResponse<PaginateResponseModel<HistoryModel[]>>>
      (`${API_DELIVERY_URL}/management/${managementId}/logs?PageNumber=${pageNumber}&PageSize=${pageSize}&startdate=${startDate}&enddate=${endDate}`)
      .pipe(
        map((response: BaseResponse<PaginateResponseModel<HistoryModel[]>>) => {
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

  getExportHistories(managementId: string, startDate: any, endDate: any) {
    return this.http.get(`${API_DELIVERY_URL}/management/${managementId}/export?startdate=${startDate}&enddate=${endDate}`,
      { responseType: 'blob' }
    );
  }
}
