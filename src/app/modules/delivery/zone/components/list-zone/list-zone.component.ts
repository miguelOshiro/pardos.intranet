import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ZoneService } from '../../services/zone.service';
import { ZoneModel } from '../../models/zone.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-zone',
  templateUrl: './list-zone.component.html',
  styleUrls: ['./list-zone.component.scss']
})
export class ListZoneComponent implements OnInit{

  zones: ZoneModel[] = [];
  hasError!: boolean;
  isLoading$!: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  constructor (private zoneService: ZoneService, private router: Router){
    this.isLoading$ = this.zoneService.isLoading$;
  }


  ngOnInit(): void {
    this.get();
  }

  get() {
    this.hasError = false;
    const zoneSubscr = this.zoneService
      .getAll()
      .pipe()
      .subscribe((zones: ZoneModel[]) => {
        console.log(zones)
        this.zones = zones;
        this.hasError = true;
      });
    this.unsubscribe.push(zoneSubscr);
  }

  editZone(id: string) {
    console.log(id);
    this.router.navigate(['edit', id]);
    
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
