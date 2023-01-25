import { Component, Input } from '@angular/core';
import { ManagerModel } from '../../../../../modules/delivery/manager/models/manager.model';
import { ManagerService } from '../../../../../modules/delivery/manager/services/manager.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mixed-widget',
  templateUrl: './mixed-widget.component.html',
  styleUrls: ['./mixed-widget.component.scss']
})
export class MixedWidgetComponent {
  @Input() model: ManagerModel;

  hasError!: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(private managerService: ManagerService, private router: Router) {}







  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
