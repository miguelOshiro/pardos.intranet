import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManagementModel } from '../models/management.model';
import { BaseResponse } from '../models/baseresponse.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_USERS_URL = `${environment.apiDeliveryUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private http: HttpClient) { }

  getManagements(): Observable<ManagementModel[]>  {
    
    return this.http
    .get<BaseResponse<ManagementModel[]>>(
      `${API_USERS_URL}/management`  
    )
    .pipe(
      map((response: BaseResponse<ManagementModel[]>) => {
        return response.data;
      })
    );

  }
  
}
