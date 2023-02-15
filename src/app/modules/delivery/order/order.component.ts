import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { OrderService } from './services/order.service';
import * as fileSaver from 'file-saver';
import { OrderModel } from './models/order.model';
import { PaginateResponseModel } from '../../../shared/models/paginateresponse.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {

  isLoadingRefresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingRefresh: boolean;

  isLoadingSearch$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingSearch: boolean;

  isLoadingExport$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingExport: boolean;
  private unsubscribe: Subscription[] = [];

  isLoadingData$: boolean;
  isEmptyData: boolean;
  isMessageData: boolean;
  //orders: [] = [];
  orderForm: FormGroup;
  data: PaginateResponseModel<OrderModel[]>;
  pageNumber: number = 1;
  pageSize: number = 5;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private fb: FormBuilder, private datePipe: DatePipe,
    private orderService: OrderService) {
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

    this.data = new PaginateResponseModel<OrderModel[]>();
    this.data.items = [];
  }

  ngOnInit(): void {
    this.isMessageData = true;
    this.orderForm = this.fb.group({
      managementId: ['', [Validators.required]],
      selectedStartDate: [this.datePipe.transform(new Date(), "yyyy-MM-dd"),],
      selectedEndDate: [this.datePipe.transform(new Date(), "yyyy-MM-dd"),],
      orderStatusId: ['',],
      orderPlatformId: ['',],
    }, { validator: this.checkDates });
  }

  getAllOrdersByManagementId(managementId: string, startDate: any, endDate: any, orderStatusId: string, orderPlatformId: string) {
    const capacitySubscr = this.orderService
      .getAllOrdersByManagementId(this.pageNumber, this.pageSize, managementId, startDate, endDate, orderStatusId, orderPlatformId)
      .pipe()
      .subscribe((data: PaginateResponseModel<OrderModel[]>) => {
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
    return this.orderForm.get('managementId')!;
  }

  onSelectOrderStatus(select: any) {
    this.orderStatusId?.setValue(select, {
      onlySelf: true,
    })
  }
  changeOrderStatus(e: any) {
    this.orderStatusId.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get orderStatusId() {
    return this.orderForm.get('orderStatusId')!;
  }
  onSelectOrderPlatform(select: any) {
    this.orderPlatformId?.setValue(select, {
      onlySelf: true,
    })
  }
  changeOrderPlatform(e: any) {
    this.orderPlatformId.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get orderPlatformId() {
    return this.orderForm.get('orderPlatformId')!;
  }

  get selectedStartDate() {
    return this.orderForm.get('selectedStartDate');
  }

  get selectedEndDate() {
    return this.orderForm.get('selectedEndDate');
  }


  searchButton() {
    this.isEmptyData = false;
    console.log(this.selectedStartDate?.value, this.selectedEndDate?.value);
    this.isMessageData = false;
    this.isLoadingData$ = true;
    this.isLoadingSearch$.next(true);
    setTimeout(() => {
      this.isLoadingSearch$.next(false);
      this.getAllOrdersByManagementId(this.managementIdForm.value, this.selectedStartDate?.value,
        this.selectedEndDate?.value, this.orderStatusId.value, this.orderPlatformId.value);
      this.changeDetectorRefs.detectChanges();
    }, 600);
  }

  exportLogButton() {
    this.isLoadingExport$.next(true);
    setTimeout(() => {
      this.orderService.getExportOrder(this.managementIdForm.value, this.selectedStartDate?.value, this.selectedEndDate?.value,
        this.orderStatusId.value, this.orderPlatformId.value).subscribe(
          async (data) => {
            fileSaver.saveAs(data, 'ORDER_' + this.managementIdForm.value + '.xlsx');
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
