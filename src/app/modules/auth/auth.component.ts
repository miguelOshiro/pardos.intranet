import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  logo: string = environment.webLogo;
  today: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('bg-body');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-body');
  }
}
