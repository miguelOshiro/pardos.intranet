import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { ManagerModel } from '../../models/manager.model';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ZoneModel } from '../../../../../shared/models/zone.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-manager',
  templateUrl: './edit-manager.component.html',
  styleUrls: ['./edit-manager.component.scss']
})
export class EditManagerComponent implements OnInit{

  numRegex = /^[0-9]{0,1}(\.[0-9][0-9])?$/i;
  isSubmitted = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  manager: ManagerModel;

  private managerId: string | null;
  selectZone: ZoneModel;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private managerService: ManagerService, private fb: FormBuilder,
    private cdr: ChangeDetectorRef) {
      const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
      this.unsubscribe.push(loadingSubscr);
    }

    ngOnInit(): void {
      this.managerId = this.activatedRoute.snapshot.paramMap.get('id');
      this.getById(this.managerId)
    }

    onSelectEstablishment(select: any) {
      this.selectZone = select;
    }
  
    editForm = this.fb.group({
      establishmentId: ['', [Validators.required ]],
      zoneId: ['', [Validators.required ]],
      itsWeekly: ['daily', [Validators.required ]],
      factor: ['', [Validators.required, Validators.pattern(this.numRegex)]]
    })

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

  get factor() {
    return this.editForm.get('factor')!;
  }

  get itsWeekly() {
    return this.editForm.get('itsWeekly')!;
  }

  getById(managerId: string | null) {
    this.managerService.getSingleManager(managerId).subscribe(data => {
      this.manager = data;
      console.log(this.manager.establishmentId);
      this.editForm.setValue({
        'establishmentId': this.manager.establishmentId,
        'zoneId': this.manager.zoneId,
        'itsWeekly': this.manager.itsWeekly ? 'weekly' : 'daily',
        'factor': this.manager.factor.toString(),
      });
      console.log(this.editForm.value);
    })
  }

  putForm() {

    this.manager = new ManagerModel();
    this.manager.id = this.managerId!;
    this.manager.establishmentId = this.establishmentId.value!;
    this.manager.zoneId = this.zoneId.value!;
    this.manager.itsWeekly = this.itsWeekly.value == 'weekly';
    this.manager.factor = parseFloat(this.factor.value!);

    this.managerService.putManager(this.manager).subscribe(data => {
      this.manager = data
      console.log(data);
    })
  }


  onSubmit(): void {

    this.isSubmitted = true;

    console.log(this.establishmentId?.invalid);

    if (!this.editForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.editForm.value));
      this.putForm();
      this.isLoading$.next(true);
      setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();


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
