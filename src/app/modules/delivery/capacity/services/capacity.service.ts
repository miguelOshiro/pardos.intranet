import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CapacityQueryModel } from '../models/capacity-query.model';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { map, finalize } from 'rxjs/operators';
import { UserType, AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CapacityService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAllCapacityByManagementId(managementId: string): Observable<CapacityQueryModel[]> {

    this.isLoadingSubject.next(true);

    return this.http.get<BaseResponse<CapacityQueryModel[]>>(`${API_DELIVERY_URL}/management/${managementId}/schedule`
    ).pipe(
      map((response: BaseResponse<CapacityQueryModel[]>) => {
        if (!response.isSuccess) {
          console.log(response.exception);
        }
        console.log(response.message);

        return response.data;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}