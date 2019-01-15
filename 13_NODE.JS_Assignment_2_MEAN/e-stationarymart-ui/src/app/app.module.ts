import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailResolver } from './services/product-detail.resolver';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { CartService } from './services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from './services/order.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailComponent, resolve: { item: ProductDetailResolver }, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductDetailComponent,
    CartComponent,
    HistoryComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    // Services
    CookieService,
    ProductService,
    CartService,
    OrderService,
    AuthService,
    AuthGuard,

    // Resolvers
    ProductDetailResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
