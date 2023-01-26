import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-total',
  templateUrl: './card-total.component.html',
  styleUrls: ['./card-total.component.scss']
})
export class CardTotalComponent {
  @Input() svgIcon = '';
  @Input() color = '';
  @Input() title: string = '';
  @Input() title2: string = '';



  data : Array<any> = [
    'Tiempo desactivado'
  ]
}
