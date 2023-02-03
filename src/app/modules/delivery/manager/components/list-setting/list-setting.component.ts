import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { TypeSettingModel } from '../../models/type-setting.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-setting',
  templateUrl: './list-setting.component.html',
  styleUrls: ['./list-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSettingComponent implements OnInit {

  private unsubscribe: Subscription[] = [];
  isLoadingData$: boolean;
  isEmptyData: boolean;
  typesSettings: TypeSettingModel[] = [];

  constructor(private settingService: SettingService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllManagementTypesSettings();
  }

  getAllManagementTypesSettings() {
    const capacitySubscr = this.settingService
      .getAllManagementTypesSettings()
      .pipe()
      .subscribe((typesSettings: TypeSettingModel[]) => {
        //console.log(typesSettings)
        this.typesSettings = typesSettings;
        console.log(this.typesSettings);
        this.isLoadingData$ = false;
        this.isEmptyData = typesSettings.length == 0;
        this.changeDetectorRefs.detectChanges();
      });
    this.unsubscribe.push(capacitySubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
