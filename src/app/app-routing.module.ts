import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { TemplateAdminComponent } from './templates/template-admin/template-admin.component';

const routes: Routes = [
  {
    path : 'auth' , loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path : "admin" , 
    component : TemplateAdminComponent , 
    loadChildren: () => import('./modules/products/products.module').then(mod => mod.ProductsModule),
    canActivate : [AuthGuard]
  },
  {
    path : "**" , redirectTo: "admin"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
