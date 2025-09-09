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


  // getRoles(){
  //   const userRole = this.authService.getUserRoles();
  //   return userRole;
  // }
  OnSubmit(){
     this.authService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.response = res;
        console.log(this.response)
        if(this.response.statusCode == 200){
          this.toastr.success('Logged in successfully!');
          
          this.router.navigateByUrl('/hospital-system')
          this.response.Token;
          this.authService.saveToken(this.response.token);
          console.log(this.authService.isLoggedIn());
          console.log(this.authService.isInRole('Admin'));
        }
        else if(this.response.statusCode == 400){
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
