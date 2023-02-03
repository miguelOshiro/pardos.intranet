import { Component, Input, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManagementQueryModel } from '../../models/management-query.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.scss']
})
export class CardManagementComponent {
  @Input() model: ManagementQueryModel;

  private unsubscribe: Subscription[] = [];

  rightPanelStyle: any = {};
  isOpen: boolean = false;


  constructor(private router: Router) { }

  editManager(id: string) {
    this.router.navigate(['delivery/manager/edit', id]);
  }

  viewSetting(id: string) {
    this.router.navigate(['delivery/manager/settings', id]);
  }

  showAction(event: any, isOpen: boolean) {

    console.log(event.clientX, event.clientY);

    //document.getElementByClass("wo-card-action").classList.add('MyClass');

    console.log(isOpen);
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
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
