import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ZoneModel } from '../models/zone.model';
import { map, finalize } from 'rxjs/operators';
import { BaseResponse } from '../../../../shared/models/baseresponse.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

const API_DELIVERY_URL = `${environment.apiDeliveryUrl}`;

export type ZoneType = ZoneModel | undefined;

@Injectable({
  providedIn: 'root'
})

export class ZoneService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAll(): Observable<ZoneModel[]> {
    this.isLoadingSubject.next(true);
    return this.http.get<BaseResponse<ZoneModel[]>>(`${API_DELIVERY_URL}/zone`).pipe(
      map((response: BaseResponse<ZoneModel[]>) => {
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

  getSingleZone(id: string | null): Observable<ZoneModel> {
    this.isLoadingSubject.next(true);
    return this.http.get<BaseResponse<ZoneModel>>(`${API_DELIVERY_URL}/zone/${id}`).pipe(
      map((response: BaseResponse<ZoneModel>) => {
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

  putZone(form: FormGroup, id: string | null): Observable<ZoneModel> {
    this.isLoadingSubject.next(true);
    return this.http.put<BaseResponse<ZoneModel>>
          (`${API_DELIVERY_URL}/zone/${id}`, form).pipe(
            map((response: BaseResponse<ZoneModel>) => {
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