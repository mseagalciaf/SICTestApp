import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadProductsComponent } from './components/read-products/read-products.component';

const routes: Routes = [
  {
    path: "", component: ReadProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
