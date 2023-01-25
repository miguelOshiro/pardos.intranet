import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ZoneModel } from '../../../../../shared/models/zone.model';
import { ManagerService } from '../../services/manager.service';
import { ManagerModel } from '../../models/manager.model';
import { EstablishmentModel } from '../../models/establishment.model';

@Component({
  selector: 'app-create-manager',
  templateUrl: './create-manager.component.html',
  styleUrls: ['./create-manager.component.scss']
})
export class CreateManagerComponent implements OnInit, OnDestroy{

  numRegex = /^[0-9]{0,1}(\.[0-9][0-9])?$/i;
  isSubmitted = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  manager: ManagerModel;

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder, private managerService: ManagerService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    
  }

  onSelectEstablishment(select: any) {
    this.establishmentId?.setValue(select, {
      onlySelf: true,
    })
    console.log(select);
  }

  onSelectZone(select: any) {
    console.log(select);

    this.zoneId?.setValue(select, {
      onlySelf: true,
    })
  }

  newForm = this.fb.group({
    establishmentId: ['', [Validators.required ]],
    zoneId: ['', [Validators.required ]],
    itsWeekly: ['daily', [Validators.required ]],
    factor: ['', [Validators.required, Validators.pattern(this.numRegex)]]
  })



  createManager() {

    this.manager = new ManagerModel();
    this.manager.establishmentId = this.establishmentId.value!;
    this.manager.zoneId = this.zoneId.value!;
    this.manager.itsWeekly = this.itsWeekly.value == 'weekly';
    this.manager.factor = parseFloat(this.factor.value!);

    this.managerService.postManager(this.manager).subscribe(data => {
      
    
      this.manager = data;
      console.log(this.manager);
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

  changeZone(e: any) {
    this.zoneId?.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get zoneId() {
    return this.newForm.get('zoneId')!;
  }

  get factor() {
    return this.newForm.get('factor')!;
  }

  get itsWeekly() {
    return this.newForm.get('itsWeekly')!;
  }

  onSubmit(): void {

    this.isSubmitted = true;

    console.log(this.establishmentId.value);
    console.log(this.zoneId.value);

    if (!this.newForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.newForm.value));
      this.createManager();

      this.isLoading$.next(true);
      setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();

    }, 900);
    }

  }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }

    validateDecimal(event: any) {

    var t = event.target.value;
    console.log(t.indexOf('.'));
    event.target.value = t.indexOf('.') >= 0 ? t.substr(0, t.indexOf('.')) + t.substr(t.indexOf('.'), 2) : t;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
