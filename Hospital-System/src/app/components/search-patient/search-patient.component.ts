import { Component } from '@angular/core';
import { patient } from '../../models/patient-model/patient';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { PatientService } from '../../services/PatientService/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-patient',
  standalone: false,
  templateUrl: './search-patient.component.html',
  styleUrl: './search-patient.component.css'
})
export class SearchPatientComponent {

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
    var subscritpion1 = this.patientService.getAllPatients().subscribe({
      next: (patients) => { this.patientsList = patients},
      error: (err) => { console.log(err) }
    })

    this.subscriptions.push(subscritpion1);

    this.searchSubject.pipe(debounceTime(500) , distinctUntilChanged())
    .subscribe(searchValue => this.filterPatients(searchValue))
  }


  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  filterPatients(query:string){
    if(query){
     var subsctription2 = this.patientService.searchPatientsByName(query).subscribe({
          next:(patients) => {this.filteredPatients = patients},
          error:(err) => {console.log(err)}
        })

      this.subscriptions.push(subsctription2);
    }
    // const queryText = this.searchText.toLowerCase();
    // var subscritpion2 = this.patientService.searchPatientsByName(queryText).subscribe({
    //   next:(patients) => {this.filteredPatients = patients},
    //   error:(err) => {console.log(err)}
    // })

  
  }

  goToDoctor(id:string){
    this.router.navigate(['/hospital-system/doctor' , id]);
  }

  goToDetails(id:string){
    this.router.navigate(['/hospital-system/edit-patient' , id]);
  }

  //unsubscribe all observables when leaving the component ...
  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => {
      subs.unsubscribe();
    });
  }


}
