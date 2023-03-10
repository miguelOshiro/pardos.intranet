import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ZoneModel } from '../../../models/zone.model';
import { ZoneService } from '../../../services/zone.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown-zone',
  templateUrl: './dropdown-zone.component.html',
  styleUrls: ['./dropdown-zone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownZoneComponent {
  @Input() form : FormGroup;
  @Output() selectionChange = new EventEmitter();
  
  public zones: ZoneModel[] = [];

  constructor(private changeDetectorRefs: ChangeDetectorRef, private zoneService: ZoneService) {}

  ngOnInit(): void {
    this.zoneService.getZoneAll()
        .subscribe( response => {
          this.zones = response;
          this.selectionChange.emit(this.zones[0].id);
          this.changeDetectorRefs.detectChanges();
        })
    
  }

  onSelectZone(event: Event) {
    console.log((event.target as HTMLSelectElement).value);
    this.selectionChange.emit((event.target as HTMLSelectElement).value);
  }
}
