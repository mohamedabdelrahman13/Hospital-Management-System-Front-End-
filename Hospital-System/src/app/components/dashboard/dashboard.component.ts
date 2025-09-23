import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'; // optional, but good to have
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Subscription } from 'rxjs';
import { patientStatsDTO } from '../../models/patientStatsDTO/patientStatsDTO';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  public selectedView: string = 'daily';

  public totalPatients!:number
  public totalStaff!:number
  public averageCost!:number


  //dept stats...
  public deptStatsLabels!: string[];
  public deptStatsData!: number[];
  public deptStatsChartData!: ChartConfiguration['data'];
  //dept stats...

  //revenue
  public revenueLabels!: string[];
  public revenueData!: number[];
  public RevenueChartData!: ChartConfiguration['data'];
  public totalRevenue!:number;
  //revenue

  // patients trend 
  public patientsTrendStats!:patientStatsDTO[]
  public patientsTrendLabels!:string[];
  public patientsTrendData!:number[];
  public patientsTrendchart!: ChartConfiguration['data'];
  // patients trend 
  
  //appointment stats
  public appStatsLabels!:string[];
  public appStatsData!:number[];
  public appStatsChart!:ChartConfiguration['data'];
  //appointment stats


  // chart Options
  public deptStatsChartOptions: ChartOptions = {} as ChartOptions;
  public RevenueChartOptions:ChartOptions = {} as ChartOptions;
  public patientsTrendChartOptions:ChartOptions = {} as ChartOptions;
  public appStatsChartOptions:ChartOptions = {} as ChartOptions;
  // chart Options
  
  constructor(private dashboardService: DashboardService) { 

    this.RevenueChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            font: { size: 14 },
            color: '#555'
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#777' } },
        y: { grid: { color: '#eee' }, ticks: { color: '#777' } }
      }
    };


    this.deptStatsChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#555',
            font: { size: 14 }
          }
        }
      }
    };

    this.patientsTrendChartOptions = {
        responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#555',  // legend text color
                font: { size: 14 }
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#777' },
              grid: { display: false }
            },
            y: {
              ticks: { color: '#333' },
              grid: { color: '#eee' }
            }
          }
        }

         this.appStatsChartOptions = {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                font: { size: 14 },
                color: '#555'
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#777' }
            },
            y: {
              grid: { color: '#eee' },
              ticks: { color: '#777' }
            }
          }
        };
      


      }
 

  ngOnInit(): void {

    this.dashboardService.getAverageCost().subscribe(ac => this.averageCost = ac)
    this.dashboardService.getPatientsNumber().subscribe(ac => this.totalPatients = ac)
    this.dashboardService.getTotalStaff().subscribe(ac => this.totalStaff = ac)

       this.dashboardService.getRevenueStats(this.selectedView).subscribe(resp => {
      this.revenueLabels = resp.map(x => x.time);
      this.revenueData = resp.map(x => x.revenue);
      this.assignRevenueChart(this.revenueLabels , this.revenueData); 
      this.totalRevenue = this.revenueData.reduce((acc , current) => acc + current , 0);
    })
    
      this.dashboardService.getPatientsStats(this.selectedView).subscribe(resp => {
      this.patientsTrendStats = resp;
      this.patientsTrendLabels = resp.map(x=>x.time); 
      this.patientsTrendData = resp.map(x=>x.numberOfPatients);
      this.assignPatientsTrendsChart(this.patientsTrendLabels , this.patientsTrendData);
    })
    
      this.dashboardService.getAppointmentsStats(this.selectedView).subscribe(resp => {
      this.appStatsLabels = resp.map(x=>x.time); 
      this.appStatsData = resp.map(x=>x.numberOfAppointments);
      this.assignAppointmentChart(this.appStatsLabels , this.appStatsData);
    })
    
     this.dashboardService.getDepartmentsStats().subscribe(resp => {
      this.deptStatsLabels = resp.map(x=>x.department); 
      this.deptStatsData = resp.map(x=>x.numberOfPatients);
      this.assignDeptsChart(this.deptStatsLabels , this.deptStatsData);
    })
    
    
  }
  
  
  // updates the values based on the view 
  updateStats(view: string) {
    this.dashboardService.getRevenueStats(view).subscribe((res) => {
      // assign the time to labels and revenue to data 
      this.revenueLabels = res.map(x => x.time);
      this.revenueData = res.map(x => x.revenue);
      this.assignRevenueChart(this.revenueLabels , this.revenueData);

      // get total Revenue
      this.totalRevenue = this.revenueData.reduce((acc , current) => acc + current);
    })
    
    this.dashboardService.getPatientsStats(view).subscribe((resp)=>{
      this.patientsTrendStats = resp;
      this.patientsTrendLabels = resp.map(x=>x.time); 
      this.patientsTrendData = resp.map(x=>x.numberOfPatients);
      this.assignPatientsTrendsChart(this.patientsTrendLabels , this.patientsTrendData);
    })
    
    this.dashboardService.getAppointmentsStats(view).subscribe(resp => {
      this.appStatsLabels = resp.map(x=>x.time); 
      this.appStatsData = resp.map(x=>x.numberOfAppointments);
      this.assignAppointmentChart(this.appStatsLabels , this.appStatsData);
    })
  }
  
  
  
  
  assignAppointmentChart(labels:string[] , data:number[]){
    this.appStatsChart = {
      labels: labels,
      datasets: [
        {
          label: 'appointment',
          data: data,
          fill: true,
          tension: 0.4,
          borderColor: '#118ab2',
          backgroundColor: 'rgba(17, 138, 178, 0.2)',
          pointBackgroundColor: '#118ab2',
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    }
  }

  assignDeptsChart(labels:string[] , data:number[]){
    this.deptStatsChartData = {
        labels: labels,
        datasets: [
          {
            data: data, 
            backgroundColor: [
              '#118ab2',
              '#663399',
              '#ef476f',
              '#ffd166',
              '#008000',
              '#66cccc',
              '#ff6600',
              '#9999cc'
            ],
            hoverOffset: 10    
          }
        ]
      };
  }

  assignRevenueChart(labels:string[] , data:number[]){
    this.RevenueChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Revenue ($)',
          data: data,
          fill: true,
          tension: 0.4,
          borderColor: '#ff9966',
          backgroundColor: 'rgb(255 , 153 , 102 , .2)',
          pointBackgroundColor: '#ff9966',
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    }
  }

assignPatientsTrendsChart(labels:string[] , data:number[]){
  this.patientsTrendchart = {
    labels: labels,
    datasets: [
      {
        label: 'New Patient Registrations',
        data: data,
        backgroundColor: '#1e1efc',
        borderRadius: 6,
        barPercentage: 0.5,
        // barThickness:20    
      }
    ]
  }
}



}
