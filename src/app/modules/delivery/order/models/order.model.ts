import { OrderStatusModel } from './order-status.model';
import { OrderPlatformModel } from './order-platform.model';
export class OrderModel {

    establishmentId: string;
    managementOrderStatus: OrderStatusModel;
    managementOrderPlatform: OrderPlatformModel;
    number: string;
    code: string;
    date: string;
    amount: number;
    distance: number;
}