import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ManagementStatusService } from '../../services/management-status.service';
import { FormGroup } from '@angular/forms';
import { ManagementStatusQueryModel } from '../../models/management-status-query.model';

@Component({
  selector: 'app-dropdown-management-status',
  templateUrl: './dropdown-management-status.component.html',
  styleUrls: ['./dropdown-management-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownManagementStatusComponent implements OnInit{
  @Input() form : FormGroup;
  @Output() selectionChange = new EventEmitter();

  managementStatuses: ManagementStatusQueryModel[] = [];

  constructor(private changeDetectorRefs: ChangeDetectorRef, private managementStatusService: ManagementStatusService) {}

  ngOnInit(): void {
    this.managementStatusService.getManagementStatus().subscribe( response => {
      this.managementStatuses = response;
      this.selectionChange.emit(this.managementStatuses[0].id);
      this.changeDetectorRefs.detectChanges();
    })
  }

  onSelectManagementStatus(event: Event) {
    console.log((event.target as HTMLSelectElement).value);
    this.selectionChange.emit((event.target as HTMLSelectElement).value);
  }
}
