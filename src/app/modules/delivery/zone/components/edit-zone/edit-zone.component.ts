import { Component, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneModel } from '../../models/zone.model';
import { ZoneService } from '../../services/zone.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-edit-zone',
  templateUrl: './edit-zone.component.html',
  styleUrls: ['./edit-zone.component.scss']
})
export class EditZoneComponent {
  zone: ZoneModel;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  private zoneId: string | null;

  constructor(private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private router: Router,
              private zoneService: ZoneService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  editForm = new FormGroup({
    zoneId: new FormControl(''),  //<string | null>
    name: new FormControl(''),
  });

  ngOnInit(): void {
    this.zoneId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getById(this.zoneId)
    
  }

  getById(zoneId: string | null) {
    this.zoneService.getSingleZone(zoneId).subscribe(data => {
      this.zone = data;
      this.editForm.setValue({
        'zoneId': this.zone.id,
        'name': this.zone.name,
      });
      console.log(this.editForm.value);
    })
  }

  putForm(form: FormGroup) {

    // this.zoneService.putZone(form,this.zoneId).subscribe(data => {
    //   this.zone = data
    //   console.log(data);
    // })
  }

  saveSettings() {
    this.isLoading$.next(true);
    
    setTimeout(() => {

      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }



  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
