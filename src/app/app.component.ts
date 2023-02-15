import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// language list

import { ThemeModeService } from './shared/partials/layout/theme-mode-switcher/theme-mode.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(

    private modeService: ThemeModeService
  ) {
    // register translations
  }

  ngOnInit() {
    this.modeService.init();
  }
}