import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ManagementCommandModel } from '../models/management-command.model';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, finalize } from 'rxjs/operators';
import { ManagementQueryModel } from '../models/management-query.model';
import { AuthService } from '../../../auth/services/auth.service';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAllManagement(): Observable<ManagementQueryModel[]> {
    this.isLoadingSubject.next(true);
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.authService.logout();
    }

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth?.authToken}`,
    });

    return this.http.get<BaseResponse<ManagementQueryModel[]>>(`${API_DELIVERY_URL}/management`, {
      headers: httpHeaders,
    }).pipe(
      map((response: BaseResponse<ManagementQueryModel[]>) => {
        console.log(response);
        if (!response.isSuccess) {
          console.log(response.exception);
        }
        console.log(response.message);

        return response.data;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  postManagement(model: ManagementCommandModel | null): Observable<BaseResponse<ManagementCommandModel>> {
    console.log(model);
    this.isLoadingSubject.next(true);
    return this.http.post<BaseResponse<ManagementCommandModel>>
      (`${API_DELIVERY_URL}/management`, model).pipe(
        map((response: BaseResponse<ManagementCommandModel>) => {
          //console.log(response);
          return response;
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  getSingleManagement(id: string | null): Observable<ManagementQueryModel> {
    this.isLoadingSubject.next(true);
    return this.http.get<BaseResponse<ManagementQueryModel>>(`${API_DELIVERY_URL}/management/${id}`).pipe(
      map((response: BaseResponse<ManagementQueryModel>) => {
        //console.log(response);
        if (!response.isSuccess) {
          console.log(response.exception);
        }
        console.log(response.message);

        return response.data;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  putManagement(model: ManagementCommandModel): Observable<BaseResponse<ManagementQueryModel>> {
    this.isLoadingSubject.next(true);
    return this.http.put<BaseResponse<ManagementQueryModel>>
      (`${API_DELIVERY_URL}/management/${model.id}`, model).pipe(
        map((response: BaseResponse<ManagementQueryModel>) => {
          return response;
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }
}
