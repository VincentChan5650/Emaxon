import { Observable } from 'rxjs/Rx';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart:ShoppingCart;
  constructor(
    private cartService:ShoppingCartService
  ) { 
  }

  addToCart(){
    //use the addToCart() to add a product to shopping-cart
    this.cartService.addToCart(this.product);
  }

}
