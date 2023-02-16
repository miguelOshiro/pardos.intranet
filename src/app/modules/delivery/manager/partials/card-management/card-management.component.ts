import { Component, Input, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManagementQueryModel } from '../../models/management-query.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardManagementComponent {
  @Input() model: ManagementQueryModel;
  @Input() isOpen: boolean;

  private unsubscribe: Subscription[] = [];

  rightPanelStyle: any = {};

  constructor(private router: Router, private changeDetectorRefs: ChangeDetectorRef) { }

  editManager(id: string) {
    this.router.navigate(['delivery/manager/edit', id]);
  }

  viewSetting(id: string) {
    this.router.navigate(['delivery/manager/settings', id]);
  }

  showAction(event: any, isOpen: boolean) {
    //console.log(event.clientX, event.clientY);
    console.log('showAction init: ' + isOpen);
    if (isOpen) {
      this.rightPanelStyle = {
        'display': '',
      };
      this.isOpen = false;
    } else {
      this.rightPanelStyle = {
        'display': 'flex',
      };
      this.isOpen = true;
    }
    console.log('showAction end: ' + this.isOpen);
    this.changeDetectorRefs.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
