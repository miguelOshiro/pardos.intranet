import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu1',
  templateUrl: './dropdown-menu1.component.html',
})
export class DropdownMenu1Component implements OnInit {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown w-400px w-md-350px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  constructor() {}

  ngOnInit(): void {}
}