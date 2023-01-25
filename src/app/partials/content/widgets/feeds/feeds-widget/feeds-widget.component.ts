import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feeds-widget',
  templateUrl: './feeds-widget.component.html',
  styleUrls: ['./feeds-widget.component.scss']
})
export class FeedsWidgetComponent {
  @Input() svgIcon = '';
  @Input() color = '';
  @Input() title: string = '';
  @Input() title2: string = '';



  data : Array<any> = [
    'Tiempo desactivado'
  ]
}
