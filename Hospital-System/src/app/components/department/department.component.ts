import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/DepartmentService/department.service';
import { department } from '../../models/department/department';
import { Subject, debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  standalone: false,
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit{
  public searchText!:string
  public department!:department;
  public searchSubject = new Subject<string>();

  constructor(private departmentService:DepartmentService
    ,private router:Router){

  }
  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(500) , distinctUntilChanged())
    .subscribe(query => this.searchDepartments(query))
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }


  goToDetails(id:string){
    
  }

  goToAddDoctor(id:string){
    this.router.navigateByUrl(`/hospital-system/addDoctor/${id}`);
  }
  searchDepartments(query:string){
    if(query){
      this.departmentService.searchDepartments(query).subscribe({
        next:(dept)=> {this.department = dept , console.log(this.department)},
        error:(err) => {console.log(err)}
      })
    }
  }
}
