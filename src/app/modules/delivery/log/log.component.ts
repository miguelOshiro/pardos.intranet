import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { LogService } from './services/log.service';
import { DriverLogQueryModel } from './models/driver-log-query.model';
import * as fileSaver from 'file-saver';
import { PaginateResponseModel } from '../../../shared/models/paginateresponse.model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogComponent implements OnInit {

  private unsubscribe: Subscription[] = [];

  isLoadingRefresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingRefresh: boolean;

  isLoadingSearch$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingSearch: boolean;

  isLoadingExport$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingExport: boolean;

  isLoadingData$: boolean;
  isEmptyData: boolean;
  isMessageData: boolean;
  data: PaginateResponseModel<DriverLogQueryModel[]>;
  logForm: FormGroup;
  pageNumber: number = 1;
  pageSize: number = 5;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private logService: LogService) {

    const loadingSubscr = this.isLoadingRefresh$
      .asObservable()
      .subscribe((res) => (this.isLoadingRefresh = res));
    this.unsubscribe.push(loadingSubscr);

    const loadingSaveSubscr = this.isLoadingSearch$
      .asObservable()
      .subscribe((res) => (this.isLoadingSearch = res));
    this.unsubscribe.push(loadingSaveSubscr);

    const loadingExportSubscr = this.isLoadingExport$
      .asObservable()
      .subscribe((res) => (this.isLoadingExport = res));
    this.unsubscribe.push(loadingExportSubscr);

    this.data = new PaginateResponseModel<DriverLogQueryModel[]>();
    this.data.items = [];
  }

  ngOnInit(): void {
    this.isMessageData = true;
    this.logForm = this.fb.group({
      managementId: ['', [Validators.required]],
      selectedStartDate: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
      selectedEndDate: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
    }, { validator: this.checkDates });
  }

  getAllLogsByManagementId(managementId: string, startDate: any, endDate: any) {
    const capacitySubscr = this.logService
      .getAllLogsByManagementId(this.pageNumber, this.pageSize, managementId, startDate, endDate)
      .pipe()
      .subscribe((data: PaginateResponseModel<DriverLogQueryModel[]>) => {
        console.log(data)
        this.data = data;
        this.isLoadingData$ = false;
        this.isEmptyData = data.items.length == 0;

        this.changeDetectorRefs.detectChanges();
      });
    this.unsubscribe.push(capacitySubscr);
  }

  checkDates(group: FormGroup) {
    if (group.controls?.["selectedEndDate"].value < group.controls?.["selectedStartDate"].value) {
      return { notValid: true }
    }
    return null;
  }

  onSelectManagement(select: any) {
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
    return this.logForm.get('managementId')!;
  }


  get selectedStartDate() {
    return this.logForm.get('selectedStartDate');
  }

  get selectedEndDate() {
    return this.logForm.get('selectedEndDate');
  }

  searchButton() {

    this.isEmptyData = false;
    this.isMessageData = false;
    this.isLoadingData$ = true;
    this.isLoadingSearch$.next(true);
    setTimeout(() => {
      this.isLoadingSearch$.next(false);
      this.getAllLogsByManagementId(this.managementIdForm.value, this.selectedStartDate?.value, this.selectedEndDate?.value);
      this.changeDetectorRefs.detectChanges();
    }, 600);
  }

  exportLogButton() {
    this.isLoadingExport$.next(true);
    setTimeout(() => {
      this.logService.getExportDriver(this.managementIdForm.value, this.selectedStartDate?.value, this.selectedEndDate?.value).subscribe(
        async (data) => {
          fileSaver.saveAs(data, 'DRIVER_LOG_' + this.managementIdForm.value + '.xlsx');
        },
        (err) => {
          console.log(err);
        }
      );
      this.isLoadingExport$.next(false);
      this.changeDetectorRefs.detectChanges();
    }, 600);
  }
}
