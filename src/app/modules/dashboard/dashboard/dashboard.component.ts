import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EstablishmentModel } from 'src/app/shared/models/establishment.model';
import { EstablishmentService } from '../../../shared/services/establishment.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder) {

    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {

  }

  newForm = this.fb.group({
    establishmentId: ['', [Validators.required ]],
  })

  onSelectEstablishment(select: any) {
    this.establishmentId?.setValue(select, {
      onlySelf: true,
    })
  }

  changeEstablishment(e: any) {
    this.establishmentId?.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get establishmentId() {
    return this.newForm.get('establishmentId')!;
  }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);

      console.log(this.onSelectEstablishment);
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
