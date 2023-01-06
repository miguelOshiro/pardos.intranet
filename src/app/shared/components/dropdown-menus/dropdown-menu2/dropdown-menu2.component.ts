import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu2',
  templateUrl: './dropdown-menu2.component.html',
})
export class DropdownMenu2Component implements OnInit {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  constructor() {}

  ngOnInit(): void {}
}
