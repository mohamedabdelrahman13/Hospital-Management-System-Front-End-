import { Component, OnInit } from '@angular/core';
import { login } from '../../models/login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  private response!:any;

  constructor(private fb:FormBuilder
    ,private authService:AuthService
    ,private router:Router
    ,private toastr:ToastrService) {
    
  }
 
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['' , Validators.required],
      password:['' , Validators.required]
    })
  }

  OnSubmit(){
     this.authService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.response = res;
        if(this.response.statusCode === 200){
          this.toastr.success('Logged in successfully!');
          this.authService.saveToken(this.response.token);
          if(this.authService.isInRole('Admin'))
              this.router.navigate(['/dashboard'])
          else if(this.authService.isInRole('Doctor'))
              this.router.navigateByUrl('/hospital-system/app-Schedule')
          else if(this.authService.isInRole('Staff'))
              this.router.navigateByUrl('/hospital-system/patient')
          this.router.navigateByUrl('/hospital-system')
          this.response.Token;
        }
        else if(this.response.statusCode === 400){
          this.toastr.error(this.response.message);
        }
        else if(this.response.statusCode === 403){
          this.toastr.error(this.response.message);
        }
      },
      error:(err)=>{console.log(err)}
     })



  }

  getRole(){
    console.log(this.authService.getUserRoles())
  }

}
