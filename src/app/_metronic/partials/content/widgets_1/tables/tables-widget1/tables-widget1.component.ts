import { AfterContentInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';


import { Router } from '@angular/router';

@Component({
  selector: 'app-tables-widget1',
  templateUrl: './tables-widget1.component.html',
})
export class TablesWidget1Component implements OnInit, AfterContentInit {

  public zones:any[] = []

  constructor(
              private router: Router,
              private cdRef: ChangeDetectorRef) {}
   ngAfterContentInit() {

      this.getZone();
      


  }

  async ngOnInit() {
    console.log('Cargando zone');
  }

  getZone() {

    // this.zoneService.getZone().subscribe(resp => {
    //   this.zones = resp;
    //   this.cdRef.markForCheck();
    //   console.log(this.zones);
    // })
  }

  newZone() {

    console.log('nueva zona');
  }

  editZone(id: string) {
    console.log(id);
    this.router.navigate(['/edit', id]);
    
  }
}
