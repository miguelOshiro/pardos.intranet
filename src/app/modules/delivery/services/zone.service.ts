import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../../../shared/models/baseresponse.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Zone } from '../models/zone.model';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  url = 'http://54.90.42.20/api/v1';


  constructor(private http: HttpClient) { }

  //http://54.90.42.20/api/v1/zone

  getZone(): Observable<Zone[]> {

    return this.http.get<BaseResponse<Zone[]>>(`${this.url}/zone`)
                .pipe(
                  map(resp => {
                    return resp.data
                  } )
                );
  }


  

}
