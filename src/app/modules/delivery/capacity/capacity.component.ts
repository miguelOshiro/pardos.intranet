import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {

  }




  days: Array<any> = [
    'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
  ]

  data: Array<any> = [
    {
      'time': '01:00',
      'days': [
        { 'day': 'Lunes', 'value': 1},
        { 'day': 'Martes', 'value': 2},
        { 'day': 'Miercoles', 'value': 3},
        { 'day': 'Jueves', 'value': 4},
        { 'day': 'Viernes', 'value': 5},
        { 'day': 'Sabado', 'value': 6},
        { 'day': 'Domingo', 'value': 7},
      ]
    },
    {
      'time': '02:00',
      'days': [
        { 'day': 'Lunes', 'value': 8},
        { 'day': 'Martes', 'value': 9},
        { 'day': 'Miercoles', 'value': 10},
        { 'day': 'Jueves', 'value': 11},
        { 'day': 'Viernes', 'value': 12},
        { 'day': 'Sabado', 'value': 13},
        { 'day': 'Domingo', 'value': 14},
      ]
    },
    {
      'time': '03:00',
      'days': [
        { 'day': 'Lunes', 'value': 15},
        { 'day': 'Martes', 'value': 16},
        { 'day': 'Miercoles', 'value': 17},
        { 'day': 'Jueves', 'value': 18},
        { 'day': 'Viernes', 'value': 19},
        { 'day': 'Sabado', 'value': 20},
        { 'day': 'Domingo', 'value': 21},
      ]
    },
  ]
}
