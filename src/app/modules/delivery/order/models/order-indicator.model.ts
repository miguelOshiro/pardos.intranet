export class OrderIndicatorModel {
    total: OrderIndicatorTotalModel;
    items: OrderIndicatorDataModel[];
}

export class OrderIndicatorDataModel {
    id: string;
    orderNumber: string;
    orderTime: string;
    deliveryTime: string;
    minOffered: number;
    minElapsed: number;
    Indicator: string;
}

export class OrderIndicatorTotalModel {
    success: number;
    warning: number;
    danger: number;

}