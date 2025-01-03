import { Component, OnInit } from '@angular/core';
import { ReporterService } from '../../services/reporter.service';
import { GetAverageBalanceByType, GetClientsHighestBalance } from '../../interface/reporter.interface';

@Component({
  selector: 'app-reporter',
  standalone: false,

  templateUrl: './reporter.component.html',
  styleUrl: './reporter.component.css'
})
export class ReporterComponent {
  informeSeleccionado: string = '';
  saldoPromedioData : GetAverageBalanceByType[] = [];

  clientesData : GetClientsHighestBalance[] = [];  
  constructor(private reporterService: ReporterService ) {
    
  }

  ShowClientsHighestBalance() {
    this.informeSeleccionado = "clientesTop"
    this.reporterService.getClientsHighestBalance().subscribe( report => this.clientesData = report);
  }
  
  ShowAverageBalanceByType() {
    this.informeSeleccionado = "saldoPromedio"
    this.reporterService.getAverageBalanceByType().subscribe( report => this.saldoPromedioData = report);
  }
  
}