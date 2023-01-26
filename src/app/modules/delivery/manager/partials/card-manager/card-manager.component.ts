import { Component, Input } from '@angular/core';
import { ManagerModel } from '../../models/manager.model';
import { ManagerService } from '../../services/manager.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-manager',
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.scss']
})
export class CardManagerComponent {
  @Input() model: ManagerModel;

  hasError!: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(private managerService: ManagerService, private router: Router) {}







  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
