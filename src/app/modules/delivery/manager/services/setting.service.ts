import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TypeSettingModel } from '../models/type-setting.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { map, finalize } from 'rxjs/operators';
import { SettingModel } from '../models/setting.model';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAllManagementTypesSettings(): Observable<TypeSettingModel[]> {
    this.isLoadingSubject.next(true);
    return this.http.get<BaseResponse<TypeSettingModel[]>>
      (`${API_DELIVERY_URL}/management/setting/types`)
      .pipe(
        map((response: BaseResponse<TypeSettingModel[]>) => {
          //console.log(response);
          return response.data;
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  getSettingsByManagementId(managementId: string): Observable<SettingModel[]> {
    this.isLoadingSubject.next(true);
    return this.http.get<BaseResponse<SettingModel[]>>
      (`${API_DELIVERY_URL}/management/${managementId}/settings`)
      .pipe(
        map((response: BaseResponse<SettingModel[]>) => {
          //console.log(response);
          return response.data;
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

}
