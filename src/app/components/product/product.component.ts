import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CreateProductData, ProductRegister, ProductResponse, UpdateProduct } from '../../interface/product.interface';
import Swal from 'sweetalert2';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-product',
  standalone: false,
  
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  mostrarModal: boolean = false;
  mostrarModalCdt: boolean = false;
  mostrarModalOpe: boolean = false;
  mostrarModalCancel: boolean = false;
  simulacionForm!: FormGroup;
  productForm!: FormGroup;
  transactionForm!: FormGroup;
  resultadoSimulacion: number | null = null;  
  accountType : string = '';
  clientId: number = 0
  cdt : ProductResponse | null = null;
  savingAccount : ProductResponse | null = null;
  checkingAccount : ProductResponse | null = null;
  operationType: 'DEPOSITO' | 'RETIRO' | 'CANCELACION' | '' = ''; 


  constructor(private fb: FormBuilder, private productService: ProductService, private activateRoute: ActivatedRoute) {
    this.simulacionForm = this.fb.group({
      tipoCuenta: ['', Validators.required],
      valorInicial: [0, [Validators.required, Validators.min(1)]],
      meses: [1, [Validators.required, Validators.min(1)]]
    });
    this.productForm = this.fb.group({
      saldoInicial: [[Validators.required, Validators.min(1)]],
    });
    this.transactionForm = this.fb.group({
      saldo: [0, [Validators.required, Validators.min(1)]],
    });
   }

   ngOnInit(){
     this.activateRoute.params
    .pipe(switchMap(({id}) =>{
      this.clientId = id
      return this.productService.getProduct(id)
    })).subscribe(productsResponse => {
      productsResponse.map(product => {
        if (product.accountType === "AHORROS") {
          this.savingAccount = product
        } else if (product.accountType === "CORRIENTE") {
          this.checkingAccount = product
        }else{
          this.cdt = product
        }
      })
    })
  
  }
  
  async agregarProducto(){
    let interestRate
    if (this.accountType === "CDT") {
      if (this.productForm.value.saldoInicial > 0) {
        interestRate = 1
      }else if (this.productForm.value.saldoInicial > 500000) {
        interestRate = 1.6
      }else if (this.productForm.value.saldoInicial > 1000000) {
        interestRate = 2
      }
    }
    const dataProduct : ProductRegister = {
      clientId: this.clientId,
      accountType: this.accountType,
      balance: this.productForm.value.saldoInicial,
      interestRate: interestRate ?? null
    };
    await this.productService.AddProduct(dataProduct).subscribe({
      next: () =>{
        Swal.fire("exitoso", "El Producto ha sido creado exitosamente", "success"),
        this.ngOnInit();
      },
      error: message => Swal.fire("Error", message, "error")
    })
    this.closeModalCdt();
    await this.ngOnInit();
  }

  openModal(): void {
    this.mostrarModal = true;
    this.resultadoSimulacion = null;
  }

  simularInteres(): void {
    const { tipoCuenta, valorInicial, meses } = this.simulacionForm.value;

    if (tipoCuenta === 'ahorros') {
      this.resultadoSimulacion = this.calcularInteresCompuesto(valorInicial, 0.004, meses);
    } else if (tipoCuenta === 'cdt') {
      let tasaInteres = 0;
      if (valorInicial <= 500000) {
        tasaInteres = 0.01;
      } else if (valorInicial <= 1000000) {
        tasaInteres = 0.016;
      } else {
        tasaInteres = 0.02;
      }
      this.resultadoSimulacion = this.calcularInteresCompuesto(valorInicial, tasaInteres, meses);
    }
  }

  calcularInteresCompuesto(principal: number, tasa: number, meses: number): number {
    return principal * Math.pow(1 + tasa, meses);
  }

  closeModal(): void {
    this.resultadoSimulacion = null;
    this.mostrarModal = false;   
  }

  openModalCdt(tipoProducto: string) {
    this.mostrarModalCdt = true
    this.accountType = tipoProducto
  }
  
  closeModalCdt() {
    this.mostrarModalCdt = false
    this.accountType = '';
  }
  openModalOpe(transactionType: 'DEPOSITO' | 'RETIRO' | 'CANCELACION' | '', accountType: string) {
    this.mostrarModalOpe = true
    this.operationType = transactionType
    this.accountType = accountType
  }
  
  closeModalOpe() {
    this.mostrarModalOpe = false
  }

  async makeTransaction(){
    let productId: number
    if (this.accountType === "AHORROS") {
      productId = this.savingAccount?.productId ?? 0
    }else if (this.accountType === "CORRIENTE") {
      productId = this.checkingAccount?.productId ?? 0
    }else
    {
      productId = this.cdt?.productId ?? 0
    }
    const dataTransaction : UpdateProduct = {
      productId : productId,
      transactionType : this.operationType,
      amount : this.transactionForm.value.saldo
    };
    await this.productService.UpdateProduct(dataTransaction).subscribe({
      next: () => {
        Swal.fire("exitoso", "Transacción realizada exitosamente", "success"),
        this.ngOnInit();
      },
      error: message => Swal.fire("Error", message, "error")
    })
    await this.productService.AddTransaction(dataTransaction).subscribe({
      next: async () =>{
        console.log("Transaccion guardada exitosamente"),
        await this.ngOnInit();
      },
      error: message => console.log(message)
    })
    this.closeModalOpe();
  }

  openModalCancel(transactionType: 'DEPOSITO' | 'RETIRO' | 'CANCELACION' | '', accountType: string) {
    this.operationType = transactionType
    this.accountType = accountType
    this.mostrarModalCancel = true;
  }

  closeModalCancel(): void {
    this.mostrarModalCancel = false;
  }

  async confirmarCancelacion(){
    await this.makeTransaction();
    this.closeModalCancel();
  }
}
