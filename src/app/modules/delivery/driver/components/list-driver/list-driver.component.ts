import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BehaviorSubject, Subscription } from 'rxjs';
import { DriverService } from '../../services/driver.service';
import { DriverDetailQueryrModel } from '../../models/driver-detail-query.model';
import { DriverQueryModel } from '../../models/driver-query.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { DriverCommandModel } from '../../models/driver-command.model';


@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrls: ['./list-driver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDriverComponent {
  isLoadingRefresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingRefresh: boolean;

  isLoadingSave$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingSave: boolean;
  isLoadingData: boolean;
  isEmptyData: boolean;

  private unsubscribe: Subscription[] = [];

  drivers: DriverQueryModel[] = [];


  constructor(private changeDetectorRefs: ChangeDetectorRef,
    private fb: FormBuilder,
    private driverService: DriverService,
    private toastService: ToastService) {
    const loadingRefreshSubscr = this.isLoadingRefresh$
      .asObservable()
      .subscribe((res) => (this.isLoadingRefresh = res));
    this.unsubscribe.push(loadingRefreshSubscr);

    const loadingSaveSubscr = this.isLoadingSave$
      .asObservable()
      .subscribe((res) => (this.isLoadingSave = res));
    this.unsubscribe.push(loadingSaveSubscr);
  }

  ngOnInit(): void {
    this.isLoadingData = true;
  }

  getAllDriverByManagementId(managementId: string) {
    const driverSubscr = this.driverService
      .getAllDriverByManagementId(managementId)
      .pipe()
      .subscribe((driver: DriverQueryModel[]) => {
        console.log(driver)
        this.drivers = driver;
        this.isLoadingData = false;
        this.isEmptyData = driver == null;
        this.changeDetectorRefs.detectChanges();
      });
    this.unsubscribe.push(driverSubscr);
  }

  putDriver(managementId: string, model: DriverCommandModel) {

    console.log(model);
    const driverSubscr = this.driverService
      .putDriver(managementId, model)
      .pipe()
      .subscribe(response => {
        console.log(response)
        this.drivers = response.data;

        if (response.isSuccess) {
          this.toastService.show(response.message, { classname: 'bg-success text-light', delay: 10000 });

        }
        else {
          this.toastService.show(response.message, { classname: 'bg-danger text-light', delay: 15000 });
          console.log(response.exception);
        }


        this.changeDetectorRefs.detectChanges();
      });
    this.unsubscribe.push(driverSubscr);
  }

  driverForm = this.fb.group({
    managementId: ['', [Validators.required]],
  })

  onSelectManagement(select: any) {
    this.getAllDriverByManagementId(select);
    this.managementId?.setValue(select, {
      onlySelf: true,
    })
  }

  changeManagement(e: any) {
    this.managementId.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get managementId() {
    return this.driverForm.get('managementId')!;
  }

  saveDriver() {

    this.isLoadingSave$.next(true);

    setTimeout(() => {
      this.isLoadingSave$.next(false);

      const schedules: DriverQueryModel[] = [];
      const spans = document.querySelectorAll('.identifier-driver-time');

      spans.forEach((element) => {

        const time = element.innerHTML;

        //validateQuantityDriver(value, time, day);


        const driver = new DriverQueryModel();
        driver.time = time;

        //Monday
        const inputElementMonday = document.querySelector("[data-time='" + time + "'][data-day='monday']");
        const inputMonday = inputElementMonday as HTMLInputElement;
        const valueMonday = inputMonday.value;

        const monday = new DriverDetailQueryrModel();
        monday.driver = parseInt(valueMonday);
        driver.monday = monday;

        //Tuesday
        const inputElementTuesday = document.querySelector("[data-time='" + time + "'][data-day='tuesday']");
        const inputTuesday = inputElementTuesday as HTMLInputElement;
        const valueTuesday = inputTuesday.value;

        const tuesday = new DriverDetailQueryrModel();
        tuesday.driver = parseInt(valueTuesday);
        driver.tuesday = tuesday;

        //wednesday
        const inputElementWednesday = document.querySelector("[data-time='" + time + "'][data-day='wednesday']");
        const inputWednesday = inputElementWednesday as HTMLInputElement;
        const valueWednesday = inputWednesday.value;

        const wednesday = new DriverDetailQueryrModel();
        wednesday.driver = parseInt(valueWednesday);
        driver.wednesday = wednesday;

        //thursday
        const inputElementThursday = document.querySelector("[data-time='" + time + "'][data-day='thursday']");
        const inputThursday = inputElementThursday as HTMLInputElement;
        const valueThursday = inputThursday.value;

        const thursday = new DriverDetailQueryrModel();
        thursday.driver = parseInt(valueThursday);
        driver.thursday = thursday;

        //friday
        const inputElementFriday = document.querySelector("[data-time='" + time + "'][data-day='friday']");
        const inputFriday = inputElementFriday as HTMLInputElement;
        const valueFriday = inputFriday.value;

        const friday = new DriverDetailQueryrModel();
        friday.driver = parseInt(valueFriday);
        driver.friday = friday;

        //saturday
        const inputElementSaturday = document.querySelector("[data-time='" + time + "'][data-day='saturday']");
        const inputSaturday = inputElementSaturday as HTMLInputElement;
        const valueSaturday = inputSaturday.value;

        const saturday = new DriverDetailQueryrModel();
        saturday.driver = parseInt(valueSaturday);
        driver.saturday = saturday;

        //sunday
        const inputElementSunday = document.querySelector("[data-time='" + time + "'][data-day='sunday']");
        const inputSunday = inputElementSunday as HTMLInputElement;
        const valueSunday = inputSunday.value;

        const sunday = new DriverDetailQueryrModel();
        sunday.driver = parseInt(valueSunday);
        driver.sunday = sunday;

        schedules.push(driver);
      });

      const request = new DriverCommandModel();
      request.managementId = this.managementId.value!;
      request.schedules = schedules;

      this.putDriver(this.managementId.value!, request);

      this.changeDetectorRefs.detectChanges();
    }, 900);

  }

  refreshDriver() {

    this.isLoadingRefresh$.next(true);

    setTimeout(() => {
      this.isLoadingRefresh$.next(false);
      this.getAllDriverByManagementId(this.managementId.value!);
      this.changeDetectorRefs.detectChanges();
    }, 900);
  }

  eventKeyDown(element: any, time: string, day: string) {
    const charCode = (element.which) ? element.which : element.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('charCode restricted is ' + charCode);
      return false;
    }
    let value = element.target.value;
    console.log(value);
    validateDriver(value, time, day);
    return;

  }

  // keyUpEvent(element: any, time: string, day: string) {

  //   let value = element.target.value;
  //   validateQuantityDriver(value, time, day);
  // }

  // keyDownEvent(element: any, time: string, day: string) {

  //   let value = element.target.value;
  //   validateLengthDriver(value, time, day);
  // }

}

// function validateOnlyNumbersDriver(event: any): boolean {

//   const charCode = (event.which) ? event.which : event.keyCode;
//   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//     console.log('charCode restricted is ' + charCode);
//     return false;
//   }
//   return true;
// }

function validateDriver(value: string, time: string, day: string): boolean {
  const elementInput = document.querySelector("input[data-time='" + time + "'][data-day='" + day + "']");
  const elementSpan = document.querySelector("span[data-time='" + time + "'][data-day='" + day + "']")!;

  var input = elementInput as HTMLInputElement;
  var span = elementSpan as HTMLSpanElement;

  // let quantity = parseInt(value);

  // if (quantity < 1 || quantity > 21 || value == '') {
  //   input.style.color = 'red';
  //   input.style.border = '1px solid red';
  //   span.style.color = 'red';
  //   span.style.fontSize = '10px';
  //   span.innerHTML = 'Rango (1 - 20)';
  // } else {
  //   input.style.color = '';
  //   input.style.border = '';
  //   span.innerHTML = '';
  // }

  if (value.length >= 2) {
    value = value.slice(0, -1);
    input.value = value;
  }
  return true;

}

function validateLengthDriver(value: string, time: string, day: string) {

  const elementInput = document.querySelector("input[data-time='" + time + "'][data-day='" + day + "']");

  var input = elementInput as HTMLInputElement;

  if (value.length >= 2) {
    value = value.slice(0, -1);
    input.value = value;
    return;
  }
}

function driverQuantityValidate(value: string, time: string, day: string) {

  const elementInput = document.querySelector("input[data-time='" + time + "'][data-day='" + day + "']");
  const elementSpan = document.querySelector("span[data-time='" + time + "'][data-day='" + day + "']")!;

  var input = elementInput as HTMLInputElement;
  var span = elementSpan as HTMLSpanElement;

  let quantity = parseInt(value);
  console.log(quantity);

  if (quantity < 1 || quantity > 21 || value == '') {
    input.style.color = 'red';
    input.style.border = '1px solid red';
    span.style.color = 'red';
    span.style.fontSize = '10px';
    span.innerHTML = 'Rango (1 - 20)';
  } else {
    input.style.color = '';
    input.style.border = '';
    span.innerHTML = '';
  }

}

function validateQuantityDriver(value: string, time: string, day: string) {

  const elementInput = document.querySelector("input[data-time='" + time + "'][data-day='" + day + "']");
  const elementSpan = document.querySelector("span[data-time='" + time + "'][data-day='" + day + "']")!;

  var input = elementInput as HTMLInputElement;
  var span = elementSpan as HTMLSpanElement;

  let quantity = parseInt(value);
  console.log(value);

  if (typeof value !== "undefined" && !isNaN(quantity)) {
    const re = '^[0-9]+$';

    if (!value.match(re)) {
      value = value.slice(0, -1);
    }
    console.log('algo');
    if (quantity < 1 || quantity > 21 || value == '') {
      input.style.color = 'red';
      input.style.border = '1px solid red';
      span.style.color = 'red';
      span.style.fontSize = '10px';
      span.innerHTML = 'Rango (1 - 20)';
    } else {
      input.style.color = '';
      input.style.border = '';
      span.innerHTML = '';
    }
  }
}


