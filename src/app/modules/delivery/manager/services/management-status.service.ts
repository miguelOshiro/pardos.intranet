import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ManagementStatusQueryModel } from '../models/management-status-query.model';
import { AuthService } from '../../../auth/services/auth.service';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ManagementStatusService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  getManagementStatus(): Observable<ManagementStatusQueryModel[]> {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http.get<BaseResponse<ManagementStatusQueryModel[]>>
      (`${API_DELIVERY_URL}/management/statuses`, {
        headers: httpHeaders
      })
      .pipe(
        map((response: BaseResponse<ManagementStatusQueryModel[]>) => {
          //console.log(response);
          return response.data;
        })
      );
  }

}
