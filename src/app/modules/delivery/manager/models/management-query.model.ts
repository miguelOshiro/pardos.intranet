import { ManagementStatusQueryModel } from './management-status-query.model';
export class ManagementQueryModel {

    id: string;
    establishmentId: string;
    establishmentName: string;
    zoneId: string;
    managementStatus: ManagementStatusQueryModel;
    isAutomatic: boolean;
    itsWeekly: boolean;
    factor: number;
    driver: number;
    capacity: number;
    estimatedTime: number;
    appOrders: number;
    cfiOrders: number;
    webOrders: number;
    totalOrders: number;
}