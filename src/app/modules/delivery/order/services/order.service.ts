import { Injectable } from '@angular/core';
import { OrderModel } from '../models/order.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { map, finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderIndicatorModel } from '../models/order-indicator.model';
import { PaginateResponseModel } from '../../../../shared/models/paginateresponse.model';
import { AuthService } from '../../../auth/services/auth.service';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAllOrdersByManagementId(pageNumber: number, pageSize: number, managementId: string, startDate: any, endDate: any,
    orderStatusId: string, orderPlatformId: string, number: number, code: string): Observable<PaginateResponseModel<OrderModel[]>> {
    console.log(managementId, startDate, endDate, orderStatusId, orderPlatformId);
    this.isLoadingSubject.next(true);
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http.get<BaseResponse<PaginateResponseModel<OrderModel[]>>>
      (`${API_DELIVERY_URL}/management/${managementId}/orders?PageNumber=${pageNumber}&PageSize=${pageSize}&startdate=${startDate}&enddate=${endDate}
      &statusid=${orderStatusId}&platformid=${orderPlatformId}&number=${number}&code=${code}`, {
        headers: httpHeaders
      }).pipe(
        map((response: BaseResponse<PaginateResponseModel<OrderModel[]>>) => {
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

  getOrderIndicatorByManagementId(managementId: string): Observable<OrderIndicatorModel> {
    this.isLoadingSubject.next(true);
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http.get<BaseResponse<OrderIndicatorModel>>
      (`${API_DELIVERY_URL}/management/${managementId}/order/indicators`, {
        headers: httpHeaders
      }).pipe(
        map((response: BaseResponse<OrderIndicatorModel>) => {
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

  getExportOrder(managementId: string, startDate: any, endDate: any, orderStatusId: string, orderPlatformId: string,
    number: number, code: string) {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http.get(`${API_DELIVERY_URL}/management/${managementId}/orders/export?startdate=${startDate}&enddate=${endDate}
    &statusid=${orderStatusId}&platformid=${orderPlatformId}&number=${number}&code=${code}`,
      {
        responseType: 'blob',
        headers: httpHeaders
      }
    );
  }

}