import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
  { path: '', redirectTo: "login",pathMatch: "full" },
  { path: 'login', loadChildren: ()=> import("./components/login/login.module").then(m => m.LoginModule )},
  { path: 'register', loadChildren: ()=> import("./components/register/register.module").then(m => m.RegisterModule )},
  { path: 'reporter', loadChildren: ()=> import("./components/reporter/reporter.module").then(m => m.ReporterModule )},
  { path: 'product/:id', loadChildren: ()=> import("./components/product/product.module").then(m => m.ProductModule )}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
