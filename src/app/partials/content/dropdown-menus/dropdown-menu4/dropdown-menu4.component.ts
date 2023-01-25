import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu4',
  templateUrl: './dropdown-menu4.component.html',
  styleUrls: ['./dropdown-menu4.component.scss']
})
export class DropdownMenu4Component {
  @Input() managerId: string;

  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-150px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  editManager(id: string) {
    this.router.navigate(['delivery/manager/edit', id]);
  }
}
