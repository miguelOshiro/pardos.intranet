import { Component } from '@angular/core';
import { ZoneService } from '../../../../../../modules/delivery/services/zone.service';
import { BaseResponse } from '../../../../../../shared/models/baseresponse.model';
import { Zone } from '../../../../../../modules/delivery/models/zone.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables-widget1',
  templateUrl: './tables-widget1.component.html',
})
export class TablesWidget1Component {

  public zones!:any[];

  constructor(private zoneService: ZoneService,
              private router: Router) {}

  ngOnInit() {
    this.getZone();
  }

  getZone() {
    this.zoneService.getZone().subscribe(resp => {
      this.zones = resp;
      console.log(this.zones);
    })
  }

  newZone() {

    console.log('nueva zona');
  }

  editZone(id: string) {
    console.log(id);
    this.router.navigate(['/edit', id]);
    
  }
}
