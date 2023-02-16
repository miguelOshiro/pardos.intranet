import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DriverLogQueryModel } from '../models/driver-log-query.model';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginateResponseModel } from '../../../../shared/models/paginateresponse.model';
import { AuthService } from '../../../auth/services/auth.service';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;


@Injectable({
  providedIn: 'root'
})
export class LogService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAllLogsByManagementId(pageNumber: number, pageSize: number, managementId: string, startDate: any, endDate: any): Observable<PaginateResponseModel<DriverLogQueryModel[]>> {
    console.log(managementId, startDate, endDate);
    this.isLoadingSubject.next(true);

    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http.get<BaseResponse<PaginateResponseModel<DriverLogQueryModel[]>>>
      (`${API_DELIVERY_URL}/management/${managementId}/schedule/logs?PageNumber=${pageNumber}&PageSize=${pageSize}&startdate=${startDate}&enddate=${endDate}`, {
        headers: httpHeaders,
      })
      .pipe(
        map((response: BaseResponse<PaginateResponseModel<DriverLogQueryModel[]>>) => {
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
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http.get(`${API_DELIVERY_URL}/management/${managementId}/schedule/export?startdate=${startDate}&enddate=${endDate}`,
      {
        responseType: 'blob',
        headers: httpHeaders
      }
    );
  }
}
