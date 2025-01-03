import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isJuridico: boolean = false;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      identificationNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      personType: ['Natural', Validators.required],
      delegateName: ['', this.isJuridico ? Validators.required : null],
      delegateIdentificationNumber: ['', this.isJuridico ? [Validators.required, Validators.pattern(/^\d+$/)] : null],
      delegatePhone: ['', this.isJuridico ? [Validators.required, Validators.pattern(/^\d{10}$/)] : null]
    
    });
  }

  onTipoClienteChange(event: any): void {
    this.isJuridico = event.target.value === 'JURIDICO';
    if (!this.isJuridico) {
      this.registerForm.get('delegateName')?.reset();
      this.registerForm.get('delegateIdentification')?.reset();
      this.registerForm.get('delegatePhone')?.reset();
    }
  }
  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigate(["/login"]),
        error: response => {
        Swal.fire("Error","El cliente ya se encuentra registrado","error")
      }
      })
    } else {
      console.log('Formulario inválido');
    }
  }
}
