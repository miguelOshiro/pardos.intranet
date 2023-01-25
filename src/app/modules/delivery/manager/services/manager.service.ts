import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManagerModel } from '../models/manager.model';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, finalize } from 'rxjs/operators';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAllManager(): Observable<ManagerModel[]> {
    this.isLoadingSubject.next(true);
    return this.http.get<BaseResponse<ManagerModel[]>>(`${API_DELIVERY_URL}/management`).pipe(
      map((response: BaseResponse<ManagerModel[]>) => {
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

  postManager(model: ManagerModel| null): Observable<ManagerModel> {
    console.log(model);
    this.isLoadingSubject.next(true);
    return this.http.post<BaseResponse<ManagerModel>>
          (`${API_DELIVERY_URL}/management`, model).pipe(
            map((response: BaseResponse<ManagerModel>) => {
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

  getSingleManager(id: string | null): Observable<ManagerModel> {
    this.isLoadingSubject.next(true);
    return this.http.get<BaseResponse<ManagerModel>>(`${API_DELIVERY_URL}/management/${id}`).pipe(
      map((response: BaseResponse<ManagerModel>) => {
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

  putManager(model: ManagerModel): Observable<ManagerModel> {
    this.isLoadingSubject.next(true);
    return this.http.put<BaseResponse<ManagerModel>>
          (`${API_DELIVERY_URL}/management/${model.id}`, model).pipe(
            map((response: BaseResponse<ManagerModel>) => {
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

}
