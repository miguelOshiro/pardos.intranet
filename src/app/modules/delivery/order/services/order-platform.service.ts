import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OrderPlatformModel } from '../models/order-platform.model';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OrderPlatformService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOrderPlatforms(): Observable<OrderPlatformModel[]> {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http.get<BaseResponse<OrderPlatformModel[]>>
      (`${API_DELIVERY_URL}/management/order/platforms`, {
        headers: httpHeaders
      })
      .pipe(
        map((response: BaseResponse<OrderPlatformModel[]>) => {
          //console.log(response);
          return response.data;
        })
      );
  }

}
