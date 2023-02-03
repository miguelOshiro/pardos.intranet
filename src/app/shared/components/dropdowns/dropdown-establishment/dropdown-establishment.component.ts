import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EstablishmentService } from '../../../services/establishment.service';
import { EstablishmentModel } from '../../../models/establishment.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown-establishment',
  templateUrl: './dropdown-establishment.component.html',
  styleUrls: ['./dropdown-establishment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownEstablishmentComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() disabled: boolean;
  @Output() selectionChange = new EventEmitter();

  public establishments: EstablishmentModel[] = [];

  constructor(private changeDetectorRefs: ChangeDetectorRef, private establishmentService: EstablishmentService) { }

  ngOnInit(): void {
    this.establishmentService.getEstablishmentByUser()
      .subscribe(response => {
        this.establishments = response;
        this.selectionChange.emit(this.establishments[0].uuid);
        this.changeDetectorRefs.detectChanges();
      });
  }

  onSelectEstablishment(event: Event) {
    console.log((event.target as HTMLSelectElement).value);
    this.selectionChange.emit((event.target as HTMLSelectElement).value);
  }
}
