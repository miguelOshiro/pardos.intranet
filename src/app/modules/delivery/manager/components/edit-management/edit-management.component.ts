import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, AfterContentInit, ElementRef, ViewChild, Renderer2, RendererFactory2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagementService } from '../../services/management.service';
import { ManagementCommandModel } from '../../models/management-command.model';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ZoneModel } from '../../../../../shared/models/zone.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ManagementQueryModel } from '../../models/management-query.model';

@Component({
  selector: 'app-edit-management',
  templateUrl: './edit-management.component.html',
  styleUrls: ['./edit-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditManagementComponent implements OnInit, AfterViewInit, AfterContentInit {

  numRegex = /^[0-9]{0,1}(\.[0-9][0-9])?$/i;
  isSubmitted = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  editForm: FormGroup
  managementQuery: ManagementQueryModel;
  selectZone: ZoneModel;

  private unsubscribe: Subscription[] = [];
  private managementId: string | null;
  private renderer: Renderer2;

  constructor(private activatedRoute: ActivatedRoute, private rendererFactory: RendererFactory2,
    private managementService: ManagementService, private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef) {

    this.renderer = this.rendererFactory.createRenderer(null, null);

    this.editForm = this.fb.group({
      establishmentId: ['', [Validators.required]],
      zoneId: ['', [Validators.required]],
      managementStatusId: ['', [Validators.required]],
      itsWeekly: ['', [Validators.required]],
      factor: ['', [Validators.required, Validators.pattern(this.numRegex)]],
      minTime: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      maxTime: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      alert: ['', [Validators.required]],
      delivery: ['', [Validators.required]],
    });


    // const loadingSubscr = this.isLoading$
    //   .asObservable()
    //   .subscribe((res) => (this.isLoading = res));
    // this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.managementId = this.activatedRoute.snapshot.paramMap.get('id');


    const containerSplash = this.renderer.createElement('div');
    this.renderer.setProperty(containerSplash, 'id', 'splash-screen');
    this.renderer.setAttribute(containerSplash, 'class', 'splash-screen');
    this.renderer.appendChild(document.body, containerSplash);

    const splash = `
        <img src="./assets/media/logos/default-small.svg" alt="Metronic logo" />
        <span>Loading ...</span>`;

    document.getElementById('splash-screen')!.innerHTML = splash;

    this.establishmentId.disable();
  }

  ngAfterViewInit() {

  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.getById(this.managementId);
    }, 1000);
  }

  onSelectEstablishment(select: any) {
    this.establishmentId?.setValue(select, {
      onlySelf: true,
    })
  }

  onSelectZone(select: any) {
    this.zoneId?.setValue(select, {
      onlySelf: true,
    })
  }

  onSelectManagementStatus(select: any) {
    this.managementStatusId?.setValue(select, {
      onlySelf: true,
    })
  }

  changeEstablishment(e: any) {
    this.establishmentId?.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get establishmentId() {
    return this.editForm.get('establishmentId')!;
  }

  changeZone(e: any) {
    this.zoneId?.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get zoneId() {
    return this.editForm.get('zoneId')!;
  }

  changeManagement(e: any) {
    this.managementStatusId?.setValue(e.target.value, {
      onlySelf: true,
    })
  }
  get managementStatusId() {
    return this.editForm.get('managementStatusId')!;
  }

  get factor() {
    return this.editForm.get('factor')!;
  }

  get minTime() {
    return this.editForm.get('minTime')!;
  }

  get maxTime() {
    return this.editForm.get('maxTime')!;
  }

  get alert() {
    return this.editForm.get('alert')!;
  }

  get itsWeekly() {
    return this.editForm.get('itsWeekly')!;
  }

  get delivery() {
    return this.editForm.get('delivery')!;
  }

  getById(managerId: string | null) {
    this.managementService.getSingleManagement(managerId).subscribe(data => {

      this.managementQuery = data;
      console.log(this.managementQuery);
      this.editForm.setValue({
        'establishmentId': this.managementQuery.establishmentId,
        'zoneId': this.managementQuery.zoneId,
        'managementStatusId': this.managementQuery.managementStatus.id,
        'factor': this.managementQuery.factor.toString(),
        'minTime': this.managementQuery.minimumEstimatedTime,
        'maxTime': this.managementQuery.maximumEstimatedTime,
        'alert': this.managementQuery.alert,
        'delivery': this.managementQuery.itsOpen ? 'open' : 'close',
        'itsWeekly': this.managementQuery.itsWeekly ? 'weekly' : 'daily',

      });
      document.getElementById("splash-screen")?.remove();
      this.changeDetectorRefs.detectChanges();
    })
  }

  putForm() {

    const managementCommand = new ManagementCommandModel();
    managementCommand.id = this.managementId!;
    managementCommand.establishmentId = this.establishmentId.value!;
    managementCommand.zoneId = this.zoneId.value!;
    managementCommand.managementStatusId = this.managementStatusId.value!;
    managementCommand.factor = parseFloat(this.factor.value!);
    managementCommand.minimumEstimatedTime = parseInt(this.minTime.value!);
    managementCommand.maximumEstimatedTime = parseInt(this.maxTime.value!);
    managementCommand.alert = this.alert.value!;
    managementCommand.itsOpen = this.delivery.value == 'close';
    managementCommand.itsWeekly = this.itsWeekly.value == 'weekly';

    this.managementService.putManagement(managementCommand).subscribe(data => {
      console.log(data);
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;

    console.log(this.establishmentId?.value);
    console.log(this.zoneId.value);
    console.log(this.managementStatusId.value);

    if (!this.editForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.editForm.value));
      this.putForm();

      this.isLoading$.next(true);
      setTimeout(() => {
        this.isLoading$.next(false);
        this.changeDetectorRefs.detectChanges();
      }, 900);
    }
  }

  validateDecimal(event: any) {

    var t = event.target.value;
    console.log(t.indexOf('.'));
    event.target.value = t.indexOf('.') >= 0 ? t.substr(0, t.indexOf('.')) + t.substr(t.indexOf('.'), 2) : t;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
