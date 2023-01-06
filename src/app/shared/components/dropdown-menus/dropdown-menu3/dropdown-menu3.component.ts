import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu3',
  templateUrl: './dropdown-menu3.component.html',
})
export class DropdownMenu3Component implements OnInit {
  @Input() statusColor: string = 'success';
  @Input() progress: number = 50;

  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown w-500px w-md-1000px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  constructor() {}

  ngOnInit(): void {}
}
