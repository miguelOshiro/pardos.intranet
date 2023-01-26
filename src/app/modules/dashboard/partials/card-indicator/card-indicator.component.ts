import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-indicator',
  templateUrl: './card-indicator.component.html',
})
export class CardIndicatorComponent {
  @Input() icon: string = '';
  @Input() badgeColor: string = '';
  @Input() status: string = '';
  @Input() statusColor: string = '';
  @Input() title: string = '';
  @Input() title2: string = '';
  @Input() description: string = '';

  @Input() progress: number = 50;


  constructor() {}




  data: Array<any> = [
    { 'availability': 60, 'referential_time': 60,
      'reopening_factor': 0.02, 'state': 'Abierto' }
  ]
}
