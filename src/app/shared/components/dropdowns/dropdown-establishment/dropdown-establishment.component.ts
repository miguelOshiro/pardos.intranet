import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EstablishmentModel } from '../../../../modules/delivery/manager/models/establishment.model';
import { EstablishmentService } from '../../../services/establishment.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown-establishment',
  templateUrl: './dropdown-establishment.component.html',
  styleUrls: ['./dropdown-establishment.component.scss']
})
export class DropdownEstablishmentComponent implements OnInit{
  @Input() form : FormGroup;
  @Output() selectionChange = new EventEmitter();
  
  public establishments: EstablishmentModel[] = [];

  constructor(private establishmentService: EstablishmentService) {}

  ngOnInit(): void {
    this.establishmentService.getEstablishmentByUser()
        .subscribe( response => {
          this.establishments = response;
          this.selectionChange.emit(this.establishments[0].uuid);
        });    
  }

  onSelectEstablishment(event: Event) {
    console.log((event.target as HTMLSelectElement).value);
    this.selectionChange.emit((event.target as HTMLSelectElement).value);
  }
}
