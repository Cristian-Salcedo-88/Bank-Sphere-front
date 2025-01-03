import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporterComponent } from './reporter.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    {path: "", component: ReporterComponent}
  ])
  ],
  exports: [RouterModule]
})
export class ReporterRoutingModule { }
