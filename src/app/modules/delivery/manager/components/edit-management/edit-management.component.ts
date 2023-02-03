import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagementService } from '../../services/management.service';
import { ManagementCommandModel } from '../../models/management-command.model';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ZoneModel } from '../../../../../shared/models/zone.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ManagementQueryModel } from '../../models/management-query.model';

@Component({
  selector: 'app-edit-management',
  templateUrl: './edit-management.component.html',
  styleUrls: ['./edit-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditManagementComponent implements OnInit, AfterViewInit, AfterContentInit {

  numRegex = /^[0-9]{0,1}(\.[0-9][0-9])?$/i;
  isSubmitted = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  editForm: FormGroup
  private unsubscribe: Subscription[] = [];

  managementQuery: ManagementQueryModel;

  private managementId: string | null;
  selectZone: ZoneModel;

  constructor(private activatedRoute: ActivatedRoute,
    private managementService: ManagementService, private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.managementId = this.activatedRoute.snapshot.paramMap.get('id');

    this.editForm = this.fb.group({
      establishmentId: ['', [Validators.required]],
      zoneId: ['', [Validators.required]],
      managementStatusId: ['', [Validators.required]],
      itsWeekly: ['daily', [Validators.required]],
      factor: ['', [Validators.required, Validators.pattern(this.numRegex)]]
    })


    // setTimeout(() => {
    //   this.getById(this.managementId)
    //   this.changeDetectorRefs.detectChanges();
    // }, 800);

  }

  ngAfterViewInit() {
    this.getById(this.managementId);
  }

  ngAfterContentInit() {
    //this.getById(this.managementId);
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

  changeEstablishment(e: any) {
    this.establishmentId?.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get establishmentId() {
    return this.editForm.get('establishmentId')!;
  }

  changeZone(e: any) {
    this.zoneId?.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get zoneId() {
    return this.editForm.get('zoneId')!;
  }

  changeManagement(e: any) {
    this.managementStatusId?.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get managementStatusId() {
    return this.editForm.get('managementStatusId')!;
  }

  get factor() {
    return this.editForm.get('factor')!;
  }

  get itsWeekly() {
    return this.editForm.get('itsWeekly')!;
  }

  getById(managerId: string | null) {
    this.managementService.getSingleManagement(managerId).subscribe(data => {

      this.managementQuery = data;

      this.editForm.setValue({
        'establishmentId': this.managementQuery.establishmentId,
        'zoneId': this.managementQuery.zoneId,
        'managementStatusId': this.managementQuery.managementStatus.id,
        'itsWeekly': this.managementQuery.itsWeekly ? 'weekly' : 'daily',
        'factor': this.managementQuery.factor.toString(),
      });
      console.log(JSON.stringify(this.editForm.value));

      this.changeDetectorRefs.detectChanges();
    })
  }

  putForm() {

    const managementCommand = new ManagementCommandModel();
    managementCommand.id = this.managementId!;
    managementCommand.establishmentId = this.establishmentId.value!;
    managementCommand.zoneId = this.zoneId.value!;
    managementCommand.managementStatusId = this.managementStatusId.value!;
    managementCommand.itsWeekly = this.itsWeekly.value == 'weekly';
    managementCommand.factor = parseFloat(this.factor.value!);

    this.managementService.putManagement(managementCommand).subscribe(data => {
      console.log(data);
    })
  }

  onSubmit(): void {
    this.isSubmitted = true;

    console.log(this.establishmentId?.value);
    console.log(this.zoneId.value);
    console.log(this.managementStatusId.value);

    if (!this.editForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.editForm.value));
      this.putForm();

      this.isLoading$.next(true);
      setTimeout(() => {
        this.isLoading$.next(false);
        this.changeDetectorRefs.detectChanges();
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
