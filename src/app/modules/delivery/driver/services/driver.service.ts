import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, finalize } from 'rxjs/operators';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { DriverQueryModel } from '../models/driver-query.model';
import { DriverCommandModel } from '../models/driver-command.model';
import { AuthService } from '../../../auth/services/auth.service';


const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }


  getAllDriverByManagementId(managementId: string): Observable<DriverQueryModel[]> {
    this.isLoadingSubject.next(true);
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http.get<BaseResponse<DriverQueryModel[]>>(`${API_DELIVERY_URL}/management/${managementId}/schedule`, {
      headers: httpHeaders
    }).pipe(
      map((response: BaseResponse<DriverQueryModel[]>) => {

        if (!response.isSuccess) {
          console.log(response.exception);
        }
        console.log(response.message);

        return response.data;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  putDriver(managementId: string, model: DriverCommandModel): Observable<BaseResponse<DriverQueryModel[]>> {
    this.isLoadingSubject.next(true);
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });
    return this.http.put<BaseResponse<DriverQueryModel[]>>
      (`${API_DELIVERY_URL}/management/${managementId}/schedules`, model, {
        headers: httpHeaders,
      }).pipe(
        map((response: BaseResponse<DriverQueryModel[]>) => {
          console.log(response);
          return response;
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }
}
