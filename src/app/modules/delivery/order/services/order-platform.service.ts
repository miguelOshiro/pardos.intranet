import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OrderPlatformModel } from '../models/order-platform.model';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { Observable } from 'rxjs';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OrderPlatformService {

  constructor(private http: HttpClient) { }

  getOrderPlatforms(): Observable<OrderPlatformModel[]> {

    return this.http.get<BaseResponse<OrderPlatformModel[]>>
      (`${API_DELIVERY_URL}/management/order/platforms`)
      .pipe(
        map((response: BaseResponse<OrderPlatformModel[]>) => {
          //console.log(response);
          return response.data;
        })
      );
  }

}
