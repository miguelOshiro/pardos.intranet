import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../modules/auth/services/auth.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EstablishmentModel } from '../../modules/delivery/manager/models/establishment.model';
import { BaseResponse } from '../models/baseresponse.model';
import { Observable } from 'rxjs';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getEstablishmentByUser(): Observable<EstablishmentModel[]> {
    const auth = this.authService.getAuthFromLocalStorage();

    const headers = {
      Accept: 'application/vnd.pardos.v1+json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth?.authToken}`,
    };

    return this.http
      .get<BaseResponse<EstablishmentModel[]>>(
        `${API_USERS_URL}/establishments/user`,
        { headers }
      )
      .pipe(
        map((response: BaseResponse<EstablishmentModel[]>) => {
          //console.log(response);
          return response.data;
        })
      );
  }
}

// getEstablishmentByUser() {

//   const auth = this.authService.getAuthFromLocalStorage();

//   const headers = {
//     'Accept': 'application/vnd.pardos.v1+json',
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${auth?.authToken}`
//   };

//   return this.http.get<BaseResponse<EstablishmentModel[]>>(`${API_USERS_URL}/establishments/user`, {headers})
//     .pipe(
//       map( resp => {
//         console.log(resp);
//             //return resp.data.map( establishment => Establishment.establishmentFromJson(establishment) )
//         return resp.data

//       })
//     );
// }
