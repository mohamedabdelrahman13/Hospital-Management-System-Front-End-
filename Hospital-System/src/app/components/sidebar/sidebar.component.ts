import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  isSidebarOpen:boolean = true; 
  isAdmin:boolean = false;
  isDoctor:boolean = false;
  isStaff:boolean = false;
  userEmail:string | null= '';
  userId:string | null= '';

  constructor(private authService:AuthService,
    private toastr:ToastrService,
    private router:Router){

   
    
  }

  ngOnInit(): void {
    // this.authService.isInRole('Admin');
    // this.authService.$checkRoles().subscribe((roleStatus) => this.checkIsInRole = roleStatus);

    this.isAdmin = this.authService.isInRole('Admin');
    this.isDoctor = this.authService.isInRole('Doctor');
    this.isStaff = this.authService.isInRole('Staff');
    this.userEmail = this.authService.getUserEmail();
    this.userId = this.authService.getUserId();
  }
  logout(){
    this.authService.logout();
    console.log(this.authService.isLoggedIn());
    this.router.navigateByUrl('/login');
    // console.log(this.isInRole);
    this.toastr.success('logged out');
  
  }


}
