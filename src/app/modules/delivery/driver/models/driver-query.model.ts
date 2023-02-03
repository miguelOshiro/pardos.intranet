import { DriverDetailQueryrModel } from "./driver-detail-query.model";

export class DriverQueryModel {
    time: string;
    monday: DriverDetailQueryrModel;
    tuesday: DriverDetailQueryrModel;
    wednesday: DriverDetailQueryrModel;
    thursday: DriverDetailQueryrModel;
    friday: DriverDetailQueryrModel;
    saturday: DriverDetailQueryrModel;
    sunday: DriverDetailQueryrModel;
}