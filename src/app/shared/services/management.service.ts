import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManagementModel } from '../models/management.model';
import { BaseResponse } from '../models/baseresponse.model';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../modules/auth/services/auth.service';

const API_USERS_URL = `${environment.apiDeliveryUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getManagements(): Observable<ManagementModel[]> {

    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http
      .get<BaseResponse<ManagementModel[]>>(
        `${API_USERS_URL}/management`, {
        headers: httpHeaders,
      }
      )
      .pipe(
        map((response: BaseResponse<ManagementModel[]>) => {
          return response.data;
        })
      );
  }

}
