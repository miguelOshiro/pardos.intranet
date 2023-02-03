export class ManagementCommandModel {

    id: string;
    establishmentId: string;
    establishmentName: string;
    zoneId: string;
    managementStatusId: string;
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