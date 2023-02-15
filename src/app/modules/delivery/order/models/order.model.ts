import { OrderStatusModel } from './order-status.model';
import { OrderPlatformModel } from './order-platform.model';
import { ManagementQueryModel } from '../../manager/models/management-query.model';
export class OrderModel {

    management: ManagementQueryModel;
    managementOrderStatus: OrderStatusModel;
    managementOrderPlatform: OrderPlatformModel;
    number: string;
    code: string;
    date: string;
    amount: number;
    distance: number;
}