import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { TypeSettingModel } from '../../models/type-setting.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-setting',
  templateUrl: './card-setting.component.html',
  styleUrls: ['./card-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSettingComponent implements OnInit {
  @Input() model: TypeSettingModel;

  private unsubscribe: Subscription[] = [];


  constructor() { }

  ngOnInit(): void {
  }



  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
