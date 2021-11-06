import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import io from 'socket.io-client';
import { Chart } from 'chart.js';
const socket = io('http://localhost:3000');

@Component({
  selector: 'app-socket-chart',
  templateUrl: './socket-chart.component.html',
  styleUrls: ['./socket-chart.component.css'],
})
export class SocketChartComponent implements OnInit {
  title = 'dashboard';
  myPieChart: any;
  myLineChart: any;
  myBarChart: any;
  option: any = {
    responsive: true,
    scaleShowVerticalLines: false,
  };
  label: any = ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008'];
  datasets: any = [
    { data: [65, 59, 80, 81, 56, 55, 40, 77], label: 'series A' },
  ];
  // chartype: any = 'pie';
  backgroundColor:any =  [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgb(105, 201, 218,0.2)',
    'rgba(206, 58, 161, 0.2)',
  ];
  borderColor:any = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgb(105, 201, 218,1)',
    'rgba(206, 58, 161, 1)',
  ]
  constructor() {}

  ngOnInit(): void {
    const piectxtag: any = document.getElementById('pie');
    const linectxtag: any = document.getElementById('line');
    const barctxtag: any = document.getElementById('bar');
    
    // pie chart
    if (piectxtag) {
      const ctx: any = piectxtag.getContext('2d');
       this.myPieChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: this.label,
          datasets: [
            {
              label: this.datasets[0].label,
              data: this.datasets[0].data,
              backgroundColor:this.backgroundColor,
              borderColor:this.borderColor ,
              borderWidth: 1,
            },
          ],
        },
      });
    }

    // line chart
    if (linectxtag) {
      const ctx: any = linectxtag.getContext('2d');
       this.myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.label,
          datasets: [
            {
              label: this.datasets[0].label,
              data: this.datasets[0].data,
              backgroundColor:this.backgroundColor,
              borderColor:this.borderColor ,
              borderWidth: 1,
            },
          ],
        },
      });
    }

    // bar chart
    if (barctxtag) {
      const ctx: any = barctxtag.getContext('2d');
       this.myBarChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.label,
          datasets: [
            {
              label: this.datasets[0].label,
              data: this.datasets[0].data,
              backgroundColor:this.backgroundColor,
              borderColor:this.borderColor ,
              borderWidth: 1,
            },
          ],
        },
      });
    }

    socket.on('data1', (res) => {       
      this.addData(this.myPieChart,res)
    });
    socket.on('data2', (res) => {

      
      this.addData(this.myLineChart,res)
    });
    socket.on('data3', (res) => {
      
      this.addData(this.myBarChart,res)
    });
  }

  addData(
    chart: any,
    labels_data = [] // added this as an alternative null check for your server data.
  ) {
  
    // console.log(chart.data.datasets[0]);
    // console.log(labels_data);
    
    chart.data.datasets[0].data = labels_data;
    chart.update();
  }
}
