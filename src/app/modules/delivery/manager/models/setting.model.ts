import { TypeSettingModel } from './type-setting.model';

export class SettingModel {
    managementSettingType: TypeSettingModel;
    sequence: number;
    label: string;
    startingRange: string;
    endingRange: string;
    value: string;
    color: string;
}