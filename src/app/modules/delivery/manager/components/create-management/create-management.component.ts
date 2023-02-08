import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ManagementService } from '../../services/management.service';
import { ManagementCommandModel } from '../../models/management-command.model';

@Component({
  selector: 'app-create-management',
  templateUrl: './create-management.component.html',
  styleUrls: ['./create-management.component.scss']
})
export class CreateManagementComponent implements OnInit, OnDestroy {

  numRegex = /^[0-9]{0,1}(\.[0-9][0-9])?$/i;
  isSubmitted = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  management: ManagementCommandModel;
  newForm: FormGroup;

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder, private managementService: ManagementService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.newForm = this.fb.group({
      establishmentId: ['', [Validators.required]],
      zoneId: ['', [Validators.required]],
      managementStatusId: ['', [Validators.required]],
      itsWeekly: ['daily', [Validators.required]],
      factor: ['', [Validators.required, Validators.pattern(this.numRegex)]],
      minimumEstimatedTime: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      maximumEstimatedTime: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      alert: ['', [Validators.required]],
      availability: ['open', [Validators.required]],

    })
  }

  onSelectEstablishment(select: any) {
    this.establishmentId?.setValue(select, {
      onlySelf: true,
    })
  }

  onSelectZone(select: any) {
    this.zoneId?.setValue(select, {
      onlySelf: true,
    })
  }

  onSelectManagementStatus(select: any) {
    this.managementStatusId?.setValue(select, {
      onlySelf: true,
    })
  }

  createManagement() {

    this.management = new ManagementCommandModel();
    this.management.establishmentId = this.establishmentId.value!;
    this.management.zoneId = this.zoneId.value!;
    this.management.managementStatusId = this.managementStatusId.value!;
    this.management.itsWeekly = this.itsWeekly.value == 'weekly';
    this.management.factor = parseFloat(this.factor.value!);
    this.management.minimumEstimatedTime = parseInt(this.minimumEstimatedTime.value!);
    this.management.maximumEstimatedTime = parseInt(this.maximumEstimatedTime.value!);
    this.management.alert = this.alert.value!;

    this.managementService.postManagement(this.management).subscribe(data => {
      this.management = data;
      console.log(this.management);
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

  changeManagement(e: any) {
    this.managementStatusId?.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get managementStatusId() {
    return this.newForm.get('managementStatusId')!;
  }

  get factor() {
    return this.newForm.get('factor')!;
  }

  get minimumEstimatedTime() {
    return this.newForm.get('minimumEstimatedTime')!;
  }

  get maximumEstimatedTime() {
    return this.newForm.get('maximumEstimatedTime')!;
  }

  get alert() {
    return this.newForm.get('alert')!;
  }

  get itsWeekly() {
    return this.newForm.get('itsWeekly')!;
  }

  onSubmit(): void {

    this.isSubmitted = true;

    if (!this.newForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.newForm.value));
      this.createManagement();

      this.isLoading$.next(true);
      setTimeout(() => {
        this.isLoading$.next(false);
        this.cdr.detectChanges();
      }, 900);
    }
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
