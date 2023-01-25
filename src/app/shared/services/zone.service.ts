import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ZoneModel } from '../models/zone.model';
import { BaseResponse } from '../models/baseresponse.model';
import { map } from 'rxjs/operators';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ZoneService {


  constructor(private http: HttpClient, private authService: AuthService) {}


  getZoneAll(): Observable<ZoneModel[]> {

    return this.http
      .get<BaseResponse<ZoneModel[]>>(
        `${API_DELIVERY_URL}/zone`
      )
      .pipe(
        map((response: BaseResponse<ZoneModel[]>) => {
          console.log(response);
          return response.data;
        })
      );
  }

}
