import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { UserViewModel } from '../../viewModels/user/userViewModel';
import { UserService } from '../../services/userService/user.service';
import { response } from '../../models/response/response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{

  private response!:response
  public filteredUsers!:UserViewModel[];
  public searchText!:string;
  public searchSubject = new Subject<string>();

  constructor(private userService:UserService
    ,private toastr:ToastrService){}


  
  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(500) , distinctUntilChanged())
    .subscribe(searchValue => this.filterUsers(searchValue))
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  filterUsers(query:string){
    if(query){
       this.userService.filterUsers(query).subscribe({
          next:(users) => {this.filteredUsers = users ; console.log(users)},
          error:(err) => {console.log(err)}
        })
    } 
  }


  deleteUser(userId:string){
    this.userService.deleteUser(userId).subscribe((resp) => {
      this.response = resp;

      if(this.response.statusCode === 200){
        this.toastr.success(this.response.message);
      }
      else if(this.response.statusCode === 404){
        this.toastr.error(this.response.message);
      }
      else if(this.response.statusCode === 400){
        this.toastr.error(this.response.message);
      }
    })
  }
}
