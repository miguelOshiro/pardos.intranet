import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ManagementStatusQueryModel } from '../models/management-status-query.model';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ManagementStatusService {

  constructor(private http: HttpClient) { }


  getManagementStatus():Observable<ManagementStatusQueryModel[]> {

    return this.http.get<BaseResponse<ManagementStatusQueryModel[]>>
                (`${API_DELIVERY_URL}/management/statuses`)
                .pipe(
                  map((response: BaseResponse<ManagementStatusQueryModel[]>) => {
                    //console.log(response);
                    return response.data;
                  })
                );         
  }
  
}
