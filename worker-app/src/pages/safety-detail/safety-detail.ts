import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {SafetyService} from '../../services/SafetyService';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

@Component({
  selector: 'page-safety-detail',
  templateUrl: 'safety-detail.html',
  providers: [SafetyService],
})
export class SafetyDetailPage {

  safety = {};
  isLoading = true;
  isError = false;
  @ViewChild(BaseChartDirective) chart1: BaseChartDirective;
  @ViewChild(BaseChartDirective) chart2: BaseChartDirective;

  constructor(public nav: NavController, public navParams: NavParams, private safetyService: SafetyService) {
    const id = navParams.get("id");
    this.safetyService.get(id).subscribe((data) => {
        this.safety = data;
        this.initializePressure(data.pressure);
        this.initializeTemperature(parseInt(data.temperature));
        this.isLoading = false;
        this.isError = false;
    }, (error) => {
        this.isLoading = false;
        this.isError = true;
    });
  }

  goBack(){
    this.nav.pop();
  }

  // lineChart1
  public lineChartData:Array<any> = [
    {data: [], label: 'Pressure'},
  ];
  public lineChartLabels:Array<any> = ['1', '2', '3', '5', '6', '7', '8', '9', '10', '11', '12'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(46,204,113,0.2)',
      borderColor: 'rgba(46,204,113,1)',
      pointBackgroundColor: 'rgba(46,204,113,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(46,204,113,0.8)'
    },
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public initializePressure(currentPressure: number):void {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    let _lineChartData:Array<any> = [
        {data: [], label: 'Pressure'},
    ];
    let _lineChartLabels:Array<any> = [];

    for (let i = 12;i>= 0; i--) {
        let hstring = '';
        let hi = h-i;
        if (hi <0) {
            hi = hi+24;
        }
        if (hi > 9) {
            hstring = '' + hi;
        } else {
            hstring = '0' + hi;
        }
        let mstring = '';
        if (m > 9) {
            mstring = '' + m;
        } else {
            mstring = '0' + m;
        }
        if (i == 0){
            _lineChartLabels.push(hstring+':'+mstring);
        } else {
            _lineChartLabels.push(hstring+':00');
        }
        _lineChartData[0].data.push(currentPressure + Math.floor((Math.random() * 10)));
    }
    this.lineChartData = _lineChartData;
    this.lineChartLabels = _lineChartLabels
    this.chart1.chart.config.data.labels = this.lineChartLabels;
    this.chart1.chart.update();
  }

  // lineChart2
  public lineChartData2:Array<any> = [
    {data: [], label: 'Temperature'},
  ];
  public lineChartLabels2:Array<any> = ['1', '2', '3', '5', '6', '7', '8', '9', '10', '11', '12'];

  public initializeTemperature(temperature: number):void {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    let _lineChartData:Array<any> = [
        {data: [], label: 'Temperature'},
    ];
    let _lineChartLabels:Array<any> = [];

    for (let i = 12;i>= 0; i--) {
        let hstring = '';
        let hi = h-i;
        if (hi <0) {
            hi = hi+24;
        }
        if (hi > 9) {
            hstring = '' + hi;
        } else {
            hstring = '0' + hi;
        }
        let mstring = '';
        if (m > 9) {
            mstring = '' + m;
        } else {
            mstring = '0' + m;
        }
        if (i == 0){
            _lineChartLabels.push(hstring+':'+mstring);
        } else {
            _lineChartLabels.push(hstring+':00');
        }
        _lineChartData[0].data.push(temperature + Math.floor((Math.random() * 10)));
    }
    this.lineChartData2 = _lineChartData;
    this.lineChartLabels2 = _lineChartLabels
    this.chart2.chart.config.data.labels = this.lineChartLabels2;
    this.chart2.chart.update();
  }
}
