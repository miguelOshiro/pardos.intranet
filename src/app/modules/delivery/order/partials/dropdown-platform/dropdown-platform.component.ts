import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { OrderPlatformService } from '../../services/order-platform.service';
import { FormGroup } from '@angular/forms';
import { OrderPlatformModel } from '../../models/order-platform.model';

@Component({
  selector: 'app-dropdown-platform',
  templateUrl: './dropdown-platform.component.html',
  styleUrls: ['./dropdown-platform.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownPlatformComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() selectionChange = new EventEmitter();

  ordersPlatforms: OrderPlatformModel[] = [];

  constructor(private changeDetectorRefs: ChangeDetectorRef, private orderPlatformService: OrderPlatformService) { }

  ngOnInit(): void {
    this.orderPlatformService.getOrderPlatforms().subscribe(response => {
      this.ordersPlatforms = response;
      //this.selectionChange.emit(this.ordersPlatforms[0].id);
      this.changeDetectorRefs.detectChanges();
    })
  }

  onSelectOrderPlatform(event: Event) {
    console.log((event.target as HTMLSelectElement).value);
    this.selectionChange.emit((event.target as HTMLSelectElement).value);
  }

}
