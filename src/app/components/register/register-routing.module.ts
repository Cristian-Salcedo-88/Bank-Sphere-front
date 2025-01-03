import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    {path: "", component: RegisterComponent}
  ])
  ],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
