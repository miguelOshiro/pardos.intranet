import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu-action',
  templateUrl: './dropdown-menu-action.component.html',
  styleUrls: ['./dropdown-menu-action.component.scss']
})
export class DropdownMenuActionComponent {
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
