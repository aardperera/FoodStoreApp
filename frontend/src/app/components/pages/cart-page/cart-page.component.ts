import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/cartItem';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!: Cart;
  constructor(private cartService: CartService){
    this.cartService.getCartObservable().subscribe((cart)=>{
      this.cart=cart;
    })
  }

  /**removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
    this.cart.items = this.cart.items.filter((item) => item !== cartItem);

  }**/
  removeFromCart(cartItem: CartItem) {

    const index = this.cart.items.indexOf(cartItem);
    if (index !== -1) {
      this.cart.items.splice(index, 1);
    }
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id,quantity);
  }
}
