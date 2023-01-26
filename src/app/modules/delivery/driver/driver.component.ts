import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { Observable } from 'rxjs';
import { DriverModel, DriverDayModel } from './models/driver.model';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})

export class DriverComponent implements OnInit {
  form!: FormGroup;
  formOneStatus$: Observable<string>;

  constructor(private fb: FormBuilder) {
 
  }

  ngOnInit(): void {}

  get monday() {
    return this.form.get('monday');
  }

  get f() {
    return this.form.controls;
  }

  saveButton() {
    console.log('Save button');

    const drivers: DriverModel[] = [];
    const spans = document.querySelectorAll('.identifier-driver-time');

    spans.forEach((element) => {
      const driver = new DriverModel();
      driver.time = element.innerHTML;

      const inputs = document.querySelectorAll("[data-time='" + element.innerHTML + "']");

      const days: DriverDayModel[] = [];

      inputs.forEach(function (e) {
        var input = e as HTMLInputElement;
        const value = input.value;
        const time = input.getAttribute('data-time')!;
        const day = input.getAttribute('data-day')!;
        
        validateQuantityDriver(value, time, day);

        const driverDay = new DriverDayModel();
        driverDay.day = day!;
        driverDay.value = parseInt(value);
        days.push(driverDay);
      });

      driver.days = days;
      drivers.push(driver);
    });

  }

  keyUpEvent(element:any, time: string, day: string) {

    let value = element.target.value;
    validateQuantityDriver(value, time, day);
  }

  keyDownEvent(element:any, time: string, day: string) {

    let value = element.target.value;
    validateLengthDriver(value, time, day);
  }


  days: Array<any> = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];
  data = [
    {
      time: '01:00',
      days: [
        { day: 'Lunes', value: 1, style: 'color:red' },
        { day: 'Martes', value: 2 },
        { day: 'Miercoles', value: 3 },
        { day: 'Jueves', value: 4 },
        { day: 'Viernes', value: 5 },
        { day: 'Sabado', value: 6 },
        { day: 'Domingo', value: 7 },
      ],
    },
    {
      time: '02:00',
      days: [
        { day: 'Lunes', value: 8 },
        { day: 'Martes', value: 9 },
        { day: 'Miercoles', value: 10 },
        { day: 'Jueves', value: 11 },
        { day: 'Viernes', value: 12 },
        { day: 'Sabado', value: 13 },
        { day: 'Domingo', value: 14 },
      ],
    },
    {
      time: '03:00',
      days: [
        { day: 'Lunes', value: 15 },
        { day: 'Martes', value: 16 },
        { day: 'Miercoles', value: 17 },
        { day: 'Jueves', value: 18 },
        { day: 'Viernes', value: 19 },
        { day: 'Sabado', value: 20 },
        { day: 'Domingo', value: 21 },
      ],
    },
  ];

}

function validateLengthDriver(value: string, time: string, day: string) {

  const elementInput = document.querySelector("input[data-time='" + time + "'][data-day='" + day + "']");

  var input = elementInput as HTMLInputElement;
      
  if(value.length >= 2) {
    value = value.slice(0, -1);
    input.value = value;
    return;
  }
}

function validateQuantityDriver(value: string, time: string, day: string) {

  const elementInput = document.querySelector("input[data-time='" + time + "'][data-day='" + day + "']");
  const elementSpan = document.querySelector("span[data-time='" + time + "'][data-day='" + day + "']")!;
  
  var input = elementInput as HTMLInputElement;
  var span = elementSpan as HTMLSpanElement;

  let quantity = parseInt(value);
  console.log(value);

  if(typeof value !== "undefined" && !isNaN(quantity)) {
    const re = '^[0-9]+$';

    if(!value.match(re)){
      value = value.slice(0, -1);
    }
    console.log('algo');
    if(quantity < 1 || quantity > 21 || value == '') {
      input.style.color = 'red';
      input.style.border = '1px solid red';
      span.style.color = 'red';
      span.style.fontSize = '10px';
      span.innerHTML = 'Rango (1 - 20)';
    }else {
      input.style.color = '';
      input.style.border = '';
      span.innerHTML = '';
    }
  } 
}

function isUndefined(value:string){
  // Obtain `undefined` value that's
  // guaranteed to not have been re-assigned
  var undefined = void(0);
  return value === undefined;
}

