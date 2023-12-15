import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartService } from './services/cart.service';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutFormService } from './services/checkout-form.service';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HttpClientModule,
    RouterLink,
    RouterLinkActive,
    NgbModule,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
  ],
  providers: [
    ProductService,
    CartService,
    CheckoutFormService,
    CheckoutService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ecommerce-angular';
}
