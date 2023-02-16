import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderStatusModel } from '../models/order-status.model';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/services/auth.service';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOrderStatus(): Observable<OrderStatusModel[]> {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http.get<BaseResponse<OrderStatusModel[]>>
      (`${API_DELIVERY_URL}/management/order/statuses`, {
        headers: httpHeaders
      })
      .pipe(
        map((response: BaseResponse<OrderStatusModel[]>) => {
          //console.log(response);
          return response.data;
        })
      );
  }
}
