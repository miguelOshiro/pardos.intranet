import { SettingModel } from './setting.model';
export class TypeSettingModel {
    id: string;
    name: string;
    description: string;
    settings: SettingModel[];
}