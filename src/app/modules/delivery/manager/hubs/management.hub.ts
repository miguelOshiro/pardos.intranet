import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
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
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
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

        this.client.onreconnecting((error) => {
            console.log("onreconnecting : " + error);
        });

        this.client.onreconnected((error) => {
            console.log("onreconnected : " + error);
        });

        this.client.onclose((error) => {
            console.log("onclose: " + error);
        });

        console.log(this.client.state);

        if (this.client.state === 'Disconnected') {
            this.client.start();
        }
    }
}