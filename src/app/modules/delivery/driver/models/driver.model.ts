

export class DriverModel {
  
    time: string;
    days: DriverDayModel[];
}

export class DriverDayModel {

    day!: string;
    value: number;
}