import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/shopping-list', pathMatch: 'full' },
  { path: 'shopping-list', canActivate: [AuthGuard], component: ShoppingListComponent },
  { path: 'products-list', component: ProductsListComponent },
  { path: 'orders-list', component: OrdersListComponent },
  { path: 'suppliers-list', component: SuppliersListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
