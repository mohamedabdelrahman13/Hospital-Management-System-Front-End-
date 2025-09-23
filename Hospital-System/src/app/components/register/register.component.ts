import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  response!:any;
  registerForm!:FormGroup;
  roles!:any;
  constructor(private authService:AuthService,
    private toastr:ToastrService
    ,private router:Router
    ,private fb:FormBuilder){

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username : ['' , [Validators.required , Validators.maxLength(60) , Validators.minLength(5) , Validators.pattern(/^[A-Za-z\s]+$/)]],
      email : ['' , [Validators.required ,  Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu)$/)]],
      password:['' , Validators.required],
      phoneNumber : ['' , [Validators.required ,  Validators.pattern(/^[0-9]{11}$/)]],
      role : ['', Validators.required]
    })

    // fetch roles 
    this.authService.getRoles().subscribe(roles => this.roles = roles);

  }


  OnSubmit(){
    this.authService.register(this.registerForm.value).subscribe({
      next:(resp) =>{
        this.response = resp
        if(this.response.statusCode === 200 ){
             this.toastr.success(this.response.message);
        }
        else if(this.response.statusCode === 400){
          this.toastr.error(this.response.message);
        }
      },

      error:(err) => console.log(err)
    })
  
  }

}
