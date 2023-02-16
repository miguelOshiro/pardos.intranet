import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HistoryService } from './services/history.service';
import { HistoryModel } from './models/history.model';
import * as fileSaver from 'file-saver';
import { PaginateResponseModel } from '../../../shared/models/paginateresponse.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent implements OnInit {
  isLoadingRefresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingRefresh: boolean;

  isLoadingSearch$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingSearch: boolean;

  isLoadingExport$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingExport: boolean;

  isLoadingData$: boolean;
  isEmptyData: boolean;
  isMessageData: boolean;
  private unsubscribe: Subscription[] = [];

  data: PaginateResponseModel<HistoryModel[]>;
  historyForm: FormGroup;
  pageNumber: number = 1;
  pageSize: number = 1;
  array: number[] = [];

  constructor(private changeDetectorRefs: ChangeDetectorRef,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private historyService: HistoryService) {

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

    this.data = new PaginateResponseModel<HistoryModel[]>();
    this.data.items = [];
  }

  ngOnInit(): void {
    this.isMessageData = true;
    this.historyForm = this.fb.group({
      managementId: ['', [Validators.required]],
      selectedStartDate: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
      selectedEndDate: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
    }, { validator: this.checkDates });
  }

  getAllHistoriesByManagementId(managementId: string, startDate: any, endDate: any) {
    const capacitySubscr = this.historyService
      .getAllHistoriesByManagementId(this.pageNumber, this.pageSize, managementId, startDate, endDate)
      .pipe()
      .subscribe((data: PaginateResponseModel<HistoryModel[]>) => {
        console.log(data)
        this.data = data;
        this.isLoadingData$ = false;
        this.isEmptyData = data.items.length == 0;
        for (let i = 0; i < this.data.totalCount; i++) {
          this.array.push(i);
        }
        console.log(this.array.length);
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

  // changeManagement(e: any) {
  //   this.managementIdForm.setValue(e.target.value, {
  //     onlySelf: true,
  //   })
  // }
  get managementIdForm() {
    return this.historyForm.get('managementId')!;
  }

  get selectedStartDate() {
    return this.historyForm.get('selectedStartDate');
  }

  get selectedEndDate() {
    return this.historyForm.get('selectedEndDate');
  }

  searchButton() {
    this.isEmptyData = false;
    this.isMessageData = false;
    this.isLoadingData$ = true;
    this.isLoadingSearch$.next(true);
    setTimeout(() => {
      this.isLoadingSearch$.next(false);
      this.getAllHistoriesByManagementId(this.managementIdForm.value, this.selectedStartDate?.value, this.selectedEndDate?.value);
      this.changeDetectorRefs.detectChanges();
    }, 600);
  }

  exportLogButton() {
    this.isLoadingExport$.next(true);
    setTimeout(() => {

      this.historyService.getExportHistories(this.managementIdForm.value, this.selectedStartDate?.value, this.selectedEndDate?.value).subscribe(
        async (data) => {
          fileSaver.saveAs(data, 'HISTORY_LOG_' + this.managementIdForm.value + '.xlsx');
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
