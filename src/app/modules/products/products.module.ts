import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from 'src/app/Design-Modules/material/material.module';
import { ReadProductsComponent } from './components/read-products/read-products.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReadProductsComponent,
    CreateDialogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ProductsModule { }
