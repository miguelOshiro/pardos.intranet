import { CapacityDetailQueryrModel } from "./capacity-detail-query.model";

export class CapacityQueryModel {
    time: string;
    monday: CapacityDetailQueryrModel;
    tuesday: CapacityDetailQueryrModel;
    wednesday: CapacityDetailQueryrModel;
    thursday: CapacityDetailQueryrModel;
    friday: CapacityDetailQueryrModel;
    saturday: CapacityDetailQueryrModel;
    sunday: CapacityDetailQueryrModel;
}