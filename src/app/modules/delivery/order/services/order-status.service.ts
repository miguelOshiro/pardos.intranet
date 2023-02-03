import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderStatusModel } from '../models/order-status.model';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  constructor(private http: HttpClient) { }

  getOrderStatus(): Observable<OrderStatusModel[]> {

    return this.http.get<BaseResponse<OrderStatusModel[]>>
      (`${API_DELIVERY_URL}/management/order/statuses`)
      .pipe(
        map((response: BaseResponse<OrderStatusModel[]>) => {
          //console.log(response);
          return response.data;
        })
      );
  }
}
