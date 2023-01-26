import { Component, Input, HostBinding } from '@angular/core';
import { getCSSVariableValue } from 'src/app/shared/kt/_utils';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-card-capacity',
  templateUrl: './card-capacity.component.html',
  styleUrls: ['./card-capacity.component.scss']
})
export class CardCapacityComponent {
  @Input() svgIcon = '';
  @Input() title: string = '';
  @Input() color = '';
  @Input() description: string = '';
  @Input() status: 'up' | 'down' = 'up';
  @Input() statusValue!: number;
  @Input() statusDesc: string = '';
  @Input() progress: number = 100;
  @Input() progressType: string = '';
  @HostBinding('class') class = 'card h-100';
  height!: number;

  chartOptions: any = {};
  labelColor!: string;
  baseColor!: string;
  lightColor!: string;
  constructor() {}

  ngOnInit(): void {
    this.height = 150;
    this.labelColor = getCSSVariableValue('--kt-gray-800');
    this.baseColor = getCSSVariableValue('--kt-' + this.color);
    this.lightColor = getCSSVariableValue('--kt-' + this.color + '-light');
    this.chartOptions = getChartOptions(
      this.height,
      this.labelColor,
      this.baseColor,
      this.lightColor
    );
  }
}

function getChartOptions(
  height: number,
  labelColor: string,
  baseColor: string,
  lightColor: string
): ApexOptions {
  return {
    series: [
      {
        name: 'Net Profit',
        data: [40, 40, 30, 30, 35, 35, 50],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: height,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: '#E4E6EF',
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' thousands';
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  };
}
