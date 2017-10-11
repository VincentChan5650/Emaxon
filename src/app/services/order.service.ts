import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService:ShoppingCartService
  ) {
    
   }

    placeOrder(order){
    return this.db.list('/orders').push(order).then((result)=>{
      this.shoppingCartService.clearCart();
      return result;
    }
    )
    
    
  }

}
