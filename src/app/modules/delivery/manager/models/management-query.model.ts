import { ManagementStatusQueryModel } from './management-status-query.model';
export class ManagementQueryModel {

    id: string;
    establishmentId: string;
    establishmentName: string;
    zoneId: string;
    managementStatus: ManagementStatusQueryModel;
    itsOpen: boolean;
    isAutomatic: boolean;
    itsWeekly: boolean;
    factor: number;
    minimumEstimatedTime: number;
    maximumEstimatedTime: number;
    estimatedTime: number;
    driver: number;
    capacity: number;
    appOrders: number;
    cfiOrders: number;
    webOrders: number;
    totalOrders: number;
    alert: string;
}