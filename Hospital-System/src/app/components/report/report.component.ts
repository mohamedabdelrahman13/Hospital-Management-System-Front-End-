import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { patientStatsDTO } from '../../models/patientStatsDTO/patientStatsDTO';
import { appointmentStatsDTO } from '../../models/AppointmentStats/AppointmentStatsDTO';
import { revenueDTO } from '../../models/revenueDTO/revenueDTO';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  standalone: false,
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  selectedView:string = 'daily';
  today: Date = new Date();
  heighestPatientRegisterationMonth!:string;
  heighestPatientRegisterationDay!:string;
  heighestAppStatsMonth!:string;
  heighestAppStatsDay!:string
  heighestRevenueDay!:string;
  heighestRevenueMonth!:string;
  patientsNumber!:number;
  staffNumber!:number;
  averageCost!:number;

  @ViewChild('report') reportElement!: ElementRef;
  public patientsTrendStats!:patientStatsDTO[];
  public appStats!:appointmentStatsDTO[];
  public revenueStats!:revenueDTO[];
  constructor(private dashboardService:DashboardService){

  }

  ngOnInit(): void {

    //patient Registeration Trends ............
    this.dashboardService.getPatientsStats(this.selectedView).subscribe((resp)=>{
      this.patientsTrendStats = resp;
      
      const heighestDay = this.patientsTrendStats.reduce((max , current) => {
        return current.numberOfPatients > max.numberOfPatients ? current : max;
      })
      this.heighestPatientRegisterationDay = heighestDay.time;
    })
    //patient Registeration Trends ............

    //Appointments Stats ...........
    this.dashboardService.getAppointmentsStats(this.selectedView).subscribe((resp)=>{
      this.appStats = resp;
      
      const heighestDay = this.appStats.reduce((max , current) => {
        return current.numberOfAppointments > max.numberOfAppointments ? current : max;
      })
      this.heighestAppStatsDay = heighestDay.time;
    })
    //Appointments Stats ...........


    //Revenue Distribution Stats .........
    this.dashboardService.getRevenueStats(this.selectedView).subscribe((resp)=>{
      this.revenueStats = resp;
      const heighestDay = this.revenueStats.reduce((max , current) => {
        return current.revenue > max.revenue ? current : max;
      })
      this.heighestRevenueDay = heighestDay.time;
    })
    //Revenue Distribution Stats .........


    // other statistics 
    this.dashboardService.getPatientsNumber().subscribe(patients => this.patientsNumber = patients)
    this.dashboardService.getAverageCost().subscribe(avg => this.averageCost = avg)
    this.dashboardService.getTotalStaff().subscribe(staff => this.staffNumber = staff)

  }


  updateStats(view:string){
    //patient Registeration Trends .......
    this.dashboardService.getPatientsStats(view).subscribe((resp)=>{
      this.patientsTrendStats = resp;
      if(view === 'monthly'){
        const heighestMonth = this.patientsTrendStats.reduce((max , current) => {
          return current.numberOfPatients > max.numberOfPatients ? current : max;
        })
        this.heighestPatientRegisterationMonth = heighestMonth.time;
      }
      
      else if(view === 'daily'){
        const heighestDay = this.patientsTrendStats.reduce((max , current) => {
          return current.numberOfPatients > max.numberOfPatients ? current : max;
        })
        this.heighestPatientRegisterationDay = heighestDay.time;
      }
    })
    //patient Registeration Trends .......

    

    //Appointments Stats ......
    this.dashboardService.getAppointmentsStats(view).subscribe((resp)=>{
      this.appStats = resp;
      if(view === 'monthly'){
        const heighestMonth = this.appStats.reduce((max , current) => {
          return current.numberOfAppointments > max.numberOfAppointments ? current : max;
        })
        this.heighestAppStatsMonth = heighestMonth.time;
      }
      
      if(view === 'daily'){
        const heighestDay = this.appStats.reduce((max , current) => {
          return current.numberOfAppointments > max.numberOfAppointments ? current : max;
        })
        this.heighestAppStatsDay = heighestDay.time;
      }
    })
    //Appointments Stats ......
    
    
    
    
    //Revenue Stats ......
    this.dashboardService.getRevenueStats(view).subscribe((resp)=>{
      this.revenueStats = resp;
      if(view === 'monthly'){
        const heighestMonth = this.revenueStats.reduce((max , current) => {
          return current.revenue > max.revenue ? current : max;
        })
        this.heighestRevenueMonth = heighestMonth.time;
      }
      if(view === 'daily'){
        const heighestDay = this.revenueStats.reduce((max , current) => {
          return current.revenue > max.revenue ? current : max;
        })
        this.heighestRevenueDay = heighestDay.time;
      }
    })
    //Revenue Stats ......
  }


  exportPDF() {
    const report = this.reportElement.nativeElement;
    html2canvas(report, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);
      const imgProps = (pdf as any).getImageProperties(imgData);
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Hospital-Report.pdf');
    });
  }
}
