export class ManagementCommandModel {

    id: string;
    establishmentId: string;
    establishmentName: string;
    zoneId: string;
    managementStatusId: string;
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