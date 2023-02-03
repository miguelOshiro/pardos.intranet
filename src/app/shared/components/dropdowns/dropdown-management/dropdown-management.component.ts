import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ManagementService } from 'src/app/shared/services/management.service';
import { ManagementModel } from '../../../models/management.model';

@Component({
  selector: 'app-dropdown-management',
  templateUrl: './dropdown-management.component.html',
  styleUrls: ['./dropdown-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownManagementComponent implements OnInit{

  @Input() form : FormGroup;
  @Input() disabled: boolean;
  @Output() selectionChange = new EventEmitter();
  
  public managements: ManagementModel[] = [];

  constructor(private changeDetectorRefs: ChangeDetectorRef, private managementService: ManagementService) {}

  ngOnInit(): void {
    this.managementService.getManagements()
        .subscribe( response => {
          this.managements = response;
          this.changeDetectorRefs.detectChanges();
          this.selectionChange.emit(this.managements[0].id);
        });    
  }

  onSelectManagement(event: Event) {
    this.selectionChange.emit((event.target as HTMLSelectElement).value);
  }
}
