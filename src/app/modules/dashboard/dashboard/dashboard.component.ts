import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ManagementService } from '../../delivery/manager/services/management.service';
import { ManagementQueryModel } from '../../delivery/manager/models/management-query.model';
import ManagementHub from '../../delivery/manager/hubs/management.hub';
import { OrderService } from '../../delivery/order/services/order.service';
import { OrderIndicatorDataModel, OrderIndicatorTotalModel } from '../../delivery/order/models/order-indicator.model';
import ManagementOrderHub from '../../delivery/order/hubs/management-order.hub';
import { ManagementStatusQueryModel } from '../../delivery/manager/models/management-status-query.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  form: FormGroup;
  managementQuery: ManagementQueryModel;
  orderIndicators: OrderIndicatorDataModel[] = [];
  orderIndicatorTotal: OrderIndicatorTotalModel;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private fb: FormBuilder,
    private managementService: ManagementService, private orderService: OrderService,
    private managemetHub: ManagementHub, private managemetOrderHub: ManagementOrderHub) {

    this.managementQuery = new ManagementQueryModel();
    this.managementQuery.managementStatus = new ManagementStatusQueryModel();
    this.orderIndicatorTotal = new OrderIndicatorTotalModel();

    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    this.managemetHub.managementMessageAnswered().subscribe(management => {

      if (this.managementQuery.id == management.id) {
        this.managementQuery.id = management.id;
        this.managementQuery.establishmentId = management.establishmentId;
        this.managementQuery.establishmentName = management.establishmentName;
        this.managementQuery.zoneId = management.zoneId;
        this.managementQuery.managementStatus.id = management.managementStatus.id;
        this.managementQuery.managementStatus.name = management.managementStatus.name;
        this.managementQuery.managementStatus.description = management.managementStatus.description;
        this.managementQuery.managementStatus.color = management.managementStatus.color;
        this.managementQuery.factor = management.factor;
        this.managementQuery.alert = management.alert;
        this.managementQuery.isAutomatic = management.isAutomatic;
        this.managementQuery.minimumEstimatedTime = management.minimumEstimatedTime;
        this.managementQuery.maximumEstimatedTime = management.maximumEstimatedTime;
        this.managementQuery.estimatedTime = management.estimatedTime;
        this.managementQuery.itsWeekly = management.itsWeekly;
        this.managementQuery.itsOpen = management.itsOpen;
        this.managementQuery.appOrders = management.appOrders;
        this.managementQuery.webOrders = management.webOrders;
        this.managementQuery.cfiOrders = management.cfiOrders;
        this.managementQuery.totalOrders = management.totalOrders;

        this.changeDetectorRefs.detectChanges();
      }
    });

    this.managemetOrderHub.orderIndicatorMessageAnswered().subscribe(orderIndicator => {

      const orderIndicatorOld = this.orderIndicators.find(x => x.id == orderIndicator.id)!;

      if (orderIndicatorOld == null) {
        this.orderIndicators.push(orderIndicator);
      }
      else {
        orderIndicatorOld.orderNumber = orderIndicator.orderNumber;
        orderIndicatorOld.orderTime = orderIndicator.orderTime;
        orderIndicatorOld.deliveryTime = orderIndicator.deliveryTime;
        orderIndicatorOld.minOffered = orderIndicator.minOffered;
        orderIndicatorOld.minElapsed = orderIndicator.minElapsed;
        orderIndicatorOld.Indicator = orderIndicator.Indicator;
      }
      this.changeDetectorRefs.detectChanges();
    });

    this.managemetOrderHub.orderIndicatorMessageRemoved().subscribe(orderIndicator => {
      this.orderIndicators = this.orderIndicators.filter(x => x.id !== orderIndicator.id);
      this.changeDetectorRefs.detectChanges();
    });

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      managementId: ['', [Validators.required]],
    })
  }

  onSelectManagement(select: any) {
    this.getManagementById(select);
    this.getOrderIndicatorByManagementId(select);
    this.managementId?.setValue(select, {
      onlySelf: true,
    })
  }

  changeManagement(e: any) {
    this.managementId.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get managementId() {
    return this.form.get('managementId')!;
  }

  getManagementById(managementId: string) {
    console.log(managementId);
    const dashboardSubscr = this.managementService
      .getSingleManagement(managementId)
      .pipe()
      .subscribe(data => {
        this.managementQuery = data;
        console.log(this.managementQuery);
        this.managemetHub.start();
        this.changeDetectorRefs.detectChanges();
      });
    this.unsubscribe.push(dashboardSubscr);
  }

  getOrderIndicatorByManagementId(managementId: string) {

    console.log(managementId);
    const orderIndicatorSubscr = this.orderService
      .getOrderIndicatorByManagementId(managementId)
      .pipe()
      .subscribe(data => {
        this.orderIndicators = data.items;
        this.orderIndicatorTotal = data.total;

        console.log(this.orderIndicators);
        this.managemetOrderHub.start();
        this.changeDetectorRefs.detectChanges();
      });
    this.unsubscribe.push(orderIndicatorSubscr);
  }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);

      console.log(this.onSelectManagement);
      this.changeDetectorRefs.detectChanges();
    }, 900);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
