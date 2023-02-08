import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: "root"
})

export default class ManagementOrderHub {

    private OrderIndicatorMessageAnswered = new Subject<any>();
    private OrderIndicatorMessageRemoved = new Subject<any>();

    public client: HubConnection;

    constructor() {
        this.client = new HubConnectionBuilder()
            .withUrl(`${environment.hubDeliveryUrl}/order`, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .build();

        this.client.on("OrderIndicatorMessageAnswered", orderIndicator => {
            console.log(orderIndicator);
            this.OrderIndicatorMessageAnswered.next(orderIndicator);
        });

        this.client.on("OrderIndicatorMessageRemoved", orderIndicator => {
            console.log(orderIndicator);
            this.OrderIndicatorMessageRemoved.next(orderIndicator);
        });
    }

    public orderIndicatorMessageAnswered() {
        return this.OrderIndicatorMessageAnswered.asObservable();
    }

    public orderIndicatorMessageRemoved() {
        return this.OrderIndicatorMessageRemoved.asObservable();
    }

    start() {
        this.client.start();
    }
}
