import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ManagerModel } from '../../models/manager.model';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent implements OnInit, OnDestroy{

  managers: ManagerModel[] = [];
  hasError!: boolean;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef, private managerService: ManagerService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.hasError = false;
    const zoneSubscr = this.managerService
      .getAllManager()
      .pipe()
      .subscribe((manager: ManagerModel[]) => {
        console.log(manager)
        this.managers = manager;
        this.hasError = true;
      });
    this.unsubscribe.push(zoneSubscr);
  }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }


  data: Array<any> = [
    { 'establishment_id': 1, 'establishment_name': 'Pardos Bellavista', 'time': 35, 'capacity': 5, 'driver': 2,
      'order_app': 0, 'order_web': 1, 'order_cfi': 0,
      'order_total': 1, 'status': true
    },
    { 'establishment_id': 1, 'establishment_name': 'Pardos Garzon', 'time': 12, 'capacity': 2, 'driver': 1,
      'order_app': 3, 'order_web': 3, 'order_cfi': 0,
      'order_total': 6, 'status': true
    },
    { 'establishment_id': 1, 'establishment_name': 'Pardos Primarvera', 'time': 22, 'capacity': 1, 'driver': 0,
      'order_app': 11, 'order_web': 10, 'order_cfi': 5,
      'order_total': 26, 'status': true
    },
    { 'establishment_id': 1, 'establishment_name': 'Pardos Talara', 'time': 44, 'capacity': 8, 'driver': 4,
      'order_app': 5, 'order_web': 5, 'order_cfi': 5,
      'order_total': 15, 'status': false
    },
    
  ]








  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
