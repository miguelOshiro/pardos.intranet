import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { CapacityQueryModel } from './models/capacity-query.model';
import { FormBuilder, Validators } from '@angular/forms';
import { CapacityService } from './services/capacity.service';
import { ManagementService } from '../manager/services/management.service';
import { ManagementQueryModel } from '../manager/models/management-query.model';
import { ManagementCommandModel } from '../manager/models/management-command.model';

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapacityComponent implements OnInit {

  isLoadingRefresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingRefresh: boolean;

  isLoadingSave$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingSave: boolean;
  isLoadingData: boolean;
  isEmptyData: boolean;

  private unsubscribe: Subscription[] = [];

  managementQuery: ManagementQueryModel;

  capacities: CapacityQueryModel[] = [];

  constructor(private changeDetectorRefs: ChangeDetectorRef, private fb: FormBuilder,
    private capacityService: CapacityService, private managementService: ManagementService) {
    const loadingSubscr = this.isLoadingRefresh$
      .asObservable()
      .subscribe((res) => (this.isLoadingRefresh = res));
    this.unsubscribe.push(loadingSubscr);

    const loadingSaveSubscr = this.isLoadingSave$
      .asObservable()
      .subscribe((res) => (this.isLoadingSave = res));
    this.unsubscribe.push(loadingSaveSubscr);
  }

  ngOnInit(): void {
    this.isLoadingData = true;
  }

  getAllCapacityByManagementId(managementId: string) {
    const capacitySubscr = this.capacityService
      .getAllCapacityByManagementId(managementId)
      .pipe()
      .subscribe((capacities: CapacityQueryModel[]) => {
        console.log(capacities)
        this.capacities = capacities;
        this.isLoadingData = false;
        this.isEmptyData = capacities == null;
        this.changeDetectorRefs.detectChanges();
      });
    this.unsubscribe.push(capacitySubscr);
  }

  getSingleManagementById(managementId: string) {
    const capacitySubscr = this.managementService.getSingleManagement(managementId)
      .subscribe((data: ManagementQueryModel) => {
        this.managementQuery = data

        this.capacityForm.setValue({
          'managementId': this.managementIdForm.value!,
          'factor': this.managementQuery.factor.toString(),
        });
        this.changeDetectorRefs.detectChanges();
      });
    this.unsubscribe.push(capacitySubscr);
  }

  updateManagement(model: ManagementQueryModel) {

    const command = new ManagementCommandModel();
    command.id = model.id;
    command.zoneId = model.zoneId;
    command.managementStatusId = model.managementStatus.id;
    command.isAutomatic = model.isAutomatic;
    command.itsWeekly = model.itsWeekly;
    command.factor = parseFloat(this.factorForm.value!);

    this.managementService.putManagement(command).subscribe(data => {
      console.log(data);
    })
  }

  capacityForm = this.fb.group({
    managementId: ['', [Validators.required]],
    factor: ['', [Validators.required]],
  })

  onSelectManagement(select: any) {
    this.getAllCapacityByManagementId(select);
    this.getSingleManagementById(select);

    this.managementIdForm?.setValue(select, {
      onlySelf: true,
    })
  }

  changeManagement(e: any) {
    this.managementIdForm.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get managementIdForm() {
    return this.capacityForm.get('managementId')!;
  }

  get factorForm() {
    return this.capacityForm.get('factor')!;
  }

  updateManagementButton() {

    if (!this.capacityForm.valid) {
      false;
    } else {
      this.isLoadingSave$.next(true);

      setTimeout(() => {
        this.isLoadingSave$.next(false);
        this.updateManagement(this.managementQuery);
        this.getAllCapacityByManagementId(this.managementIdForm.value!);
        this.changeDetectorRefs.detectChanges();
      }, 900);
    }
  }

  refreshManagementButton() {

    this.isLoadingRefresh$.next(true);

    setTimeout(() => {
      this.isLoadingRefresh$.next(false);

      this.getAllCapacityByManagementId(this.managementIdForm.value!);
      this.getSingleManagementById(this.managementIdForm.value!);

      this.changeDetectorRefs.detectChanges();
    }, 900);
  }



}
