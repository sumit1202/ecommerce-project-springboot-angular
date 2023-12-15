import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
})

export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.listCartDetails();
  }
  
  listCartDetails() {
    //? get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    //? subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    //? subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
      );
      //? compute cart totalPrice and totalQuantity
      this.cartService.computeCartTotals();
    }
    
    incrementQuantity(theCartItem: CartItem) {
      this.cartService.addToCartS(theCartItem);
    }
    
    decrementQuantity(theCartItem: CartItem) {
      this.cartService.decrementItemQuantityInCart(theCartItem);
    }
    removeItem(theCartItem: CartItem) {
      this.cartService.removeItemFromCart(theCartItem);
    }
  }
  