import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit, OnDestroy {

  constructor() {}

  ngOnInit(): void {
    document.body.classList.add('bg-body');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-body');
  }
}
