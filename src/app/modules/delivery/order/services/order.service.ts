import { Injectable } from '@angular/core';
import { OrderModel } from '../models/order.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { map, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderIndicatorModel } from '../models/order-indicator.model';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAllOrdersByManagementId(managementId: string, startDate: any, endDate: any, orderStatusId: string, orderPlatformId: string): Observable<OrderModel[]> {
    console.log(managementId, startDate, endDate, orderStatusId, orderPlatformId);
    this.isLoadingSubject.next(true);
    return this.http.get<BaseResponse<OrderModel[]>>
      (`${API_DELIVERY_URL}/management/${managementId}/orders?startdate=${startDate}&enddate=${endDate}
      &statusid=${orderStatusId}&platformid=${orderPlatformId}`).pipe(
        map((response: BaseResponse<OrderModel[]>) => {
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
    return this.http.get<BaseResponse<OrderIndicatorModel>>
      (`${API_DELIVERY_URL}/management/${managementId}/order/indicators`).pipe(
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

  getExportOrder(managementId: string, startDate: any, endDate: any, orderStatusId: string, orderPlatformId: string) {
    return this.http.get(`${API_DELIVERY_URL}/management/${managementId}/orders/export?startdate=${startDate}&enddate=${endDate}
    &statusid=${orderStatusId}&platformid=${orderPlatformId}`,
      { responseType: 'blob' }
    );
  }

}