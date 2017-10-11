import { OrderService } from './services/order.service';

import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular-4-data-table';


//services
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './product/products/products.component';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './shopping/check-out/check-out.component';
import { OrderSuccessComponent } from './shopping/order-success/order-success.component';
import { MyOrdersComponent } from './shopping/my-orders/my-orders.component';
import { AdminProductsComponent } from './auth/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './auth/admin/admin-orders/admin-orders.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductFormComponent } from './auth/admin/product-form/product-form.component';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { ProductQuantityComponent } from './product/product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping/shopping-cart-summary/shopping-cart-summary.component';

const appRoutes: Routes =[
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'check-out', 
    component: CheckOutComponent, 
    canActivate:[AuthGuard]
  },
  {
    path: 'order-success/:id', 
    component: OrderSuccessComponent, 
    canActivate:[AuthGuard]
  },
  {
    path: 'my/orders', 
    component: MyOrdersComponent, 
    canActivate:[AuthGuard]
  },
  {
    path: 'admin/products/new', 
  component: ProductFormComponent, 
  canActivate:[AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/:id', 
  component: ProductFormComponent, 
  canActivate:[AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products', 
  component: AdminProductsComponent, 
  canActivate:[AuthGuard, AdminAuthGuard]
  },
    {
      path: 'admin/orders', 
      component: AdminOrdersComponent, 
      canActivate:[AdminAuthGuard]
    }
  ];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTableModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
