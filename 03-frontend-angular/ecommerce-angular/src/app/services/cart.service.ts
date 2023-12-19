import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  //? BehaviorSubject - replays last latest missed event/msg only, not older ones
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  //? web Storage api - 2 types: web session storage and local storage
  //? session storage - data lost once tab/browser closed
  //? local storage - data lost only when user clears browser cache
  //? reference to web browser's session storage
  // storage: Storage = sessionStorage;
  storage: Storage = localStorage;

  constructor() {
    //? read data from web browser's session storage
    let data = JSON.parse(this.storage.getItem('cartItems')!); //? json parse() reads string data and converts to object

    if (data != null) {
      this.cartItems = data;
      //? compute total for data read from web browser's session storage
      this.computeCartTotals();
    }
  }

  addToCartS(theCartItem: CartItem) {
    //? check if we already have item in cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      //? find item in cart based on item id
      existingCartItem = this.cartItems.find(
        (item) => item.id === theCartItem.id
      )!;

      //? check if we found it
      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart) {
      //? increment the quantity
      existingCartItem.quantity++;
    } else {
      //? add new item to the cartItems array
      this.cartItems.push(theCartItem);
    }

    //? compute totalPrice and totalQuantity for the items in the cart
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (const cartItem of this.cartItems) {
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }

    //? cart service will publish/send new values of totalPriceValue
    //? and totalQuantityValue to subscribers i.e. cartItemsComponent
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //? logging cart data for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

    //? persist cart data
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems)); //? json stringify will convert json object to string
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart: ');
    for (let item of this.cartItems) {
      const subTotalPrice = item.quantity * item.unitPrice;
      console.log(
        `name: ${item.name}, quantity: ${item.quantity}, unit price: ${item.unitPrice}, sub total price: ${subTotalPrice}`
      );
    }
    console.log(
      `total price: ${totalPriceValue.toFixed(
        2
      )}, total quantity: ${totalQuantityValue}`
    );
    console.log('----------------------------');
  }

  decrementItemQuantityInCart(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.removeItemFromCart(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  removeItemFromCart(theCartItem: CartItem) {
    //? get index of item in array
    const itemIndex = this.cartItems.findIndex(
      (item) => item.id === theCartItem.id
    );

    //? if found, remove item from array at given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
