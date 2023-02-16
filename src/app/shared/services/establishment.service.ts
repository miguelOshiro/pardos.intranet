import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../modules/auth/services/auth.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse.model';
import { EstablishmentModel } from '../models/establishment.model';
import { Observable } from 'rxjs';

const API_USERS_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getEstablishmentByUser(): Observable<EstablishmentModel[]> {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    // const headers = {
    //   Accept: 'application/vnd.pardos.v1+json',
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${auth?.authToken}`,{ headers }
    // };

    return this.http
      .get<BaseResponse<EstablishmentModel[]>>(
        `${API_USERS_URL}/establishment`, {
        headers: httpHeaders
      }
      )
      .pipe(
        map((response: BaseResponse<EstablishmentModel[]>) => {
          return response.data;
        })
      );
  }
}
