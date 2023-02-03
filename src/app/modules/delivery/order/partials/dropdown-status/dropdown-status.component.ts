import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { OrderStatusService } from '../../services/order-status.service';
import { FormGroup } from '@angular/forms';
import { OrderStatusModel } from '../../models/order-status.model';

@Component({
  selector: 'app-dropdown-status',
  templateUrl: './dropdown-status.component.html',
  styleUrls: ['./dropdown-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownStatusComponent implements OnInit {

  @Input() form: FormGroup;
  @Output() selectionChange = new EventEmitter();

  ordersStatuses: OrderStatusModel[] = [];

  constructor(private changeDetectorRefs: ChangeDetectorRef, private orderStatusService: OrderStatusService) { }

  ngOnInit(): void {
    this.orderStatusService.getOrderStatus().subscribe(response => {
      this.ordersStatuses = response;
      //this.selectionChange.emit(this.ordersStatuses[0].id);
      this.changeDetectorRefs.detectChanges();
    })
  }

  onSelectOrderStatus(event: Event) {
    console.log((event.target as HTMLSelectElement).value);
    this.selectionChange.emit((event.target as HTMLSelectElement).value);
  }

}
