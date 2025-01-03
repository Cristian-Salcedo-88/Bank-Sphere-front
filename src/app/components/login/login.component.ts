import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  router = inject(Router)

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms(): void {
    this.loginForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.cedula).subscribe({
        next: response => this.router.navigate([`/product/${response.clientId}`]),
        error: response => { 
          Swal.fire("Error","El cliente no se encuentra registrado","error"),
          this.router.navigate(["/register"])
        }
      } )
      
    }
  }

  switchToRegister(): void {
    this.router.navigate(["/register"])
  }

}
