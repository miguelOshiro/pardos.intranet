import { DriverQueryModel } from './driver-query.model';

export class DriverCommandModel {

    managementId: string;
    schedules: DriverQueryModel[];
}