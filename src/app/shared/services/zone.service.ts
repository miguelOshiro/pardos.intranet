import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ZoneModel } from '../models/zone.model';
import { BaseResponse } from '../models/baseresponse.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/services/auth.service';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ZoneService {


  constructor(private http: HttpClient, private authService: AuthService) { }


  getZoneAll(): Observable<ZoneModel[]> {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http
      .get<BaseResponse<ZoneModel[]>>(
        `${API_DELIVERY_URL}/zone`, {
        headers: httpHeaders
      }
      )
      .pipe(
        map((response: BaseResponse<ZoneModel[]>) => {
          //console.log(response);
          return response.data;
        })
      );
  }

}
