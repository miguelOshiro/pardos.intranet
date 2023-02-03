import { Component, ChangeDetectorRef, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ManagementService } from '../../services/management.service';
import { ManagementQueryModel } from '../../models/management-query.model';

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

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(private changeDetectorRefs: ChangeDetectorRef, private ManagementService: ManagementService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {

    this.isLoadingData = true;
    this.changeDetectorRefs.detectChanges();
    this.getAllManagement();
  }

  getAllManagement() {
    const zoneSubscr = this.ManagementService
      .getAllManagement()
      .pipe()
      .subscribe((managements: ManagementQueryModel[]) => {
        console.log(managements)
        this.managements = managements;
        this.isLoadingData = false;
        this.isEmptyData = managements == null;
        this.changeDetectorRefs.detectChanges();
      });
    this.unsubscribe.push(zoneSubscr);
  }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);

    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
