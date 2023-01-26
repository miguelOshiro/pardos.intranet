import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { EstablishmentModel } from '../../../shared/models/establishment.model';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{

  isSubmitted = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  dateStart: any = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  dateEnd: any = this.datePipe.transform(new Date(), "yyyy-MM-dd");

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder, private datePipe: DatePipe) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }
  ngOnInit(): void {

  }

  form = this.fb.group({
    establishmentId: ['', [Validators.required ]],
    selectedStartDate: [this.dateStart, [Validators.required ]],
    selectedEndDate: [this.dateEnd, [Validators.required ]],
  }, {validator: this.checkDates});

  checkDates(group: FormGroup) {
    if(group.controls?.["selectedEndDate"].value <= group.controls?.["selectedStartDate"].value) {
      return { notValid:true }
    }
    return null;
  }
  
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
    return this.form.get('establishmentId');
  }

  get selectedStartDate() {
    return this.form.get('selectedStartDate');
  }

  get selectedEndDate() {
    return this.form.get('selectedEndDate');
  }


  onSubmit() {

    this.isSubmitted = true;

    console.log(this.establishmentId?.invalid);

    if (!this.form.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.form.value));

      this.isLoading$.next(true);
      setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();

    }, 600);
    }
  }

  menuThead: Array<any> = [
    'Fecha', 'Hora', 'Estado', 'Tipo', 'Usuario'
  ]

  data: Array<any> = [
    {'date': '13/01/23', 'time': '01:00', 'status': 'abierto',
     'type': 'abc', 'user': 'administrador@pardoschiken.com.pe'
    },
    {'date': '14/01/23', 'time': '03:00', 'status': 'cerrado',
    'type': 'rty', 'user': 'miguel@pardoschiken.com.pe'
   },
   {'date': '15/01/23', 'time': '03:00', 'status': 'cerrado',
   'type': 'cdf', 'user': 'pepe@pardoschiken.com.pe'
  },
  ]  
}
