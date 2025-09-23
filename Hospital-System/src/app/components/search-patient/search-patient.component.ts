import { Component } from '@angular/core';
import { patient } from '../../models/patient-model/patient';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { PatientService } from '../../services/PatientService/patient.service';
import { Router } from '@angular/router';
import { response } from '../../models/response/response';

@Component({
  selector: 'app-search-patient',
  standalone: false,
  templateUrl: './search-patient.component.html',
  styleUrl: './search-patient.component.css'
})
export class SearchPatientComponent {

  public response!:response;
  public filteredPatients!: patient[];
  public patientsList!: patient[];
  private subscriptions: Subscription[];
  public searchText!:string;
  public searchSubject = new Subject<string>();

  constructor(private patientService: PatientService
    ,private router:Router) {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(500) , distinctUntilChanged())
    .subscribe(searchValue => this.filterPatients(searchValue))
  }


  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  filterPatients(query:string){
    if(query){
     var subsctription2 = this.patientService.searchPatientsByName(query).subscribe({
          next:(resp) => {
            this.response = resp;

            // this.filterPatients = this.response.data;
            if(this.response.statusCode === 200){
              this.filteredPatients = this.response.data;
            }
            else{
              this.filteredPatients = [];
            }
          
          },
          error:(err) => {console.log(err)}
        })

      this.subscriptions.push(subsctription2);
    } 
  }

  goToDoctor(id:string){
    this.router.navigate(['/hospital-system/doctor' , id]);
  }

  goToEditPage(id:string){
    this.router.navigate(['/hospital-system/edit-patient' , id]);
  }

  goToPatientDetails(id:string){
    this.router.navigate(['/hospital-system/patient-details' , id]);
  }
}
