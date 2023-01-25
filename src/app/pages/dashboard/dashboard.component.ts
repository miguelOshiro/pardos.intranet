import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EstablishmentService } from '../../shared/services/establishment.service';
import { EstablishmentModel } from '../../modules/delivery/manager/models/establishment.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef, private establishmentService: EstablishmentService) {

    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  selectEstablishment: EstablishmentModel;

  ngOnInit(): void {

  }

  onSelectEstablishment(select: any) {
    this.selectEstablishment = select;
  }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);

      console.log(this.selectEstablishment);


      this.cdr.detectChanges();
    }, 900);
  }

  

  menuThead: Array<any> = ['Fecha', 'Hora', 'Estado', 'Tipo', 'Usuario'];

  data: Array<any> = [
    {
      date: '13/01/23',
      time: '01:00',
      status: 'abierto',
      type: 'abc',
      user: 'administrador@pardoschiken.com.pe',
    },
    {
      date: '14/01/23',
      time: '03:00',
      status: 'cerrado',
      type: 'rty',
      user: 'miguel@pardoschiken.com.pe',
    },
    {
      date: '15/01/23',
      time: '03:00',
      status: 'cerrado',
      type: 'cdf',
      user: 'pepe@pardoschiken.com.pe',
    },
  ];

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
