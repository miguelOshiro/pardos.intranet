import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { TypeSettingModel } from '../../models/type-setting.model';
import { Subscription } from 'rxjs';
import { SettingModel } from '../../models/setting.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-setting',
  templateUrl: './list-setting.component.html',
  styleUrls: ['./list-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSettingComponent implements OnInit {

  private unsubscribe: Subscription[] = [];
  private managementId: string;

  isLoadingData$: boolean;
  isEmptyData: boolean;
  typesSettings: TypeSettingModel[] = [];
  settings: SettingModel[] = [];
  capacities: SettingModel[] = [];


  constructor(private settingService: SettingService, private changeDetectorRefs: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.managementId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.getSettingsByManagementId(this.managementId);

  }

  getAllManagementTypesSettings() {
    const typesSubscr = this.settingService
      .getAllManagementTypesSettings()
      .pipe()
      .subscribe((typesSettings: TypeSettingModel[]) => {
        this.typesSettings = typesSettings;
        this.isLoadingData$ = false;
        this.isEmptyData = typesSettings.length == 0;

        this.typesSettings.forEach((type) => {
          const settings = this.settings.filter(x => x.managementSettingType.id == type.id);
          type.settings = settings;
        });

        console.log(this.typesSettings);

        this.changeDetectorRefs.detectChanges();
      });
    this.unsubscribe.push(typesSubscr);
  }

  getSettingsByManagementId(managementId: string) {
    const settingsSubscr = this.settingService
      .getSettingsByManagementId(managementId)
      .pipe()
      .subscribe((settings: SettingModel[]) => {
        this.settings = settings;
        this.isLoadingData$ = false;
        this.isEmptyData = settings.length == 0;

        this.getAllManagementTypesSettings();
      });
    this.unsubscribe.push(settingsSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
