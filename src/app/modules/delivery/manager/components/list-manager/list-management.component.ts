import { Component, ChangeDetectorRef, OnDestroy, OnInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ManagementService } from '../../services/management.service';
import { ManagementQueryModel } from '../../models/management-query.model';
import ManagementHub from '../../hubs/management.hub';

@Component({
  selector: 'app-list-management',
  templateUrl: './list-management.component.html',
  styleUrls: ['./list-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListManagementComponent implements OnInit, OnDestroy {

  managements: ManagementQueryModel[] = [];
  isLoadingData: boolean;
  isEmptyData: boolean;
  isOpen: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  private unsubscribe: Subscription[] = [];

  constructor(private changeDetectorRefs: ChangeDetectorRef,
    private managementService: ManagementService,
    private managemetHub: ManagementHub) {

    this.managemetHub.managementMessageReceived().subscribe(management => {
      console.log(management);
      this.managements.push(management);
      this.changeDetectorRefs.detectChanges();
    });

    this.managemetHub.managementMessageAnswered().subscribe(management => {

      const managementOld = this.managements.find(x => x.id == management.id)!;

      managementOld.establishmentId = management.establishmentId;
      managementOld.establishmentName = management.establishmentName;
      managementOld.zoneId = management.zoneId;
      managementOld.managementStatus.id = management.managementStatus.id;
      managementOld.managementStatus.name = management.managementStatus.name;
      managementOld.managementStatus.description = management.managementStatus.description;
      managementOld.managementStatus.color = management.managementStatus.color;
      managementOld.factor = management.factor;
      managementOld.alert = management.alert;
      managementOld.isAutomatic = management.isAutomatic;
      managementOld.minimumEstimatedTime = management.minimumEstimatedTime;
      managementOld.maximumEstimatedTime = management.maximumEstimatedTime;
      managementOld.estimatedTime = management.estimatedTime;
      managementOld.itsWeekly = management.itsWeekly;
      managementOld.itsOpen = management.itsOpen;

      this.changeDetectorRefs.detectChanges();
    });

    const loadingSubscribe = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));

    this.unsubscribe.push(loadingSubscribe);
  }

  ngOnInit(): void {

    this.isLoadingData = true;
    this.changeDetectorRefs.detectChanges();
    this.getAllManagement();
  }

  ngAfterContentInit() {

  }

  @HostListener('document:click')
  clickOutside() {
    const actionElements = document.querySelectorAll(".wo-card-action");
    actionElements.forEach((actionElement) => {
      const actionCard = actionElement as HTMLDivElement;
      actionCard.style['display'] = '';
    });
    this.isOpen = false;
  }

  getAllManagement() {
    const managementSubscribe = this.managementService
      .getAllManagement()
      .subscribe((managements: ManagementQueryModel[]) => {
        console.log(managements)
        this.managements = managements;
        this.isLoadingData = false;
        this.isEmptyData = managements.length == 0;
        this.managemetHub.start();
        this.changeDetectorRefs.detectChanges();
      });
    this.unsubscribe.push(managementSubscribe);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
