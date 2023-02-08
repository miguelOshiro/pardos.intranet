import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export default class ManagementHub {

    private messageReceived = new Subject<any>();
    private messageAnswered = new Subject<any>();

    public client: HubConnection;

    constructor() {
        this.client = new HubConnectionBuilder()
            .withUrl(`${environment.hubDeliveryUrl}/management`, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .build();

        this.client.on("ManagementMessageReceived", management => {
            this.messageReceived.next(management);
        });

        this.client.on("ManagementMessageAnswered", management => {
            this.messageAnswered.next(management);
        });
    }

    public managementMessageReceived() {
        return this.messageReceived.asObservable();
    }

    public managementMessageAnswered() {
        return this.messageAnswered.asObservable();
    }

    start() {
        this.client.start();
    }
}