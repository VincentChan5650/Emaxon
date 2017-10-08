import { Observable } from 'rxjs/Rx';
import { ShoppingCart } from '../models/shopping-cart';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { 
  }

  //create() will generate a new record to shopping-cart db in firebase
  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  };

  //getCart() will take a cardId as params, try to return a fb obserable
  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/'+cartId)
    .map(x => new ShoppingCart(x.items));
  }

  
  private getItem(cartId:string, productId:string){
    return this.db.object('/shopping-carts/'+ cartId + '/items/'+ productId);
  }

  //try to get a cartId for the user in localstorage, if not exist, then create a new shopping cart record
  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;

    }
    return cartId;
  }


  //add items to the shopping cart 
  async addToCart(product:Product){
    this.updateItemQuantity(product,1);
  }

  async removeFromCart(product:Product){
    this.updateItemQuantity(product,-1);
  }

  private async updateItemQuantity(product:Product, change:number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key)
    item$.take(1).subscribe(item=>{
       item$.update({product: product, quantity: (item.quantity || 0) + change });
    })
  }

}
