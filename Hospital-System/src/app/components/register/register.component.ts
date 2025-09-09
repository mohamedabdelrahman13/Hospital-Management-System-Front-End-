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
  registerForm!:FormGroup;
  roles!:any;
  constructor(private authService:AuthService,
    private toastr:ToastrService
    ,private router:Router
    ,private fb:FormBuilder){

  }

  ngOnInit(): void {
    this.authService.getRoles().subscribe(roles => this.roles = roles);

    this.registerForm = this.fb.group({
      username : ['' , [Validators.required , Validators.maxLength(60) , Validators.minLength(5)]],
      email : ['' , Validators.required],
      password:['' , Validators.required],
      phone : ['' , [Validators.required ,  Validators.pattern(/^[0-9]{11}$/)]],
      roleID : ['', Validators.required]
    })
  }


  OnSubmit(){
    this.authService.register(this.registerForm.value).subscribe({
      next:(resp) =>{
        this.toastr.success('Account Created!');
        // this.router.navigateByUrl('')
      },

      error:(err) => console.log(err)
    })
  }


}
