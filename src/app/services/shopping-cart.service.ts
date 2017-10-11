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
  //add items to the shopping cart 
  async addToCart(product:Product){
    this.updateItem(product,1);
  }

  async removeFromCart(product:Product){
    this.updateItem(product,-1);
  }

  //getCart() will take a cardId as params, try to return an observable
  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/'+cartId)
    .map(x => new ShoppingCart(x.items));
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+ cartId +'/items').remove();
  }

  //create() will generate a new record to shopping-cart db in firebase
  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  };
  
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

  private async updateItem(product:Product, change:number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key)
    item$.take(1).subscribe(item=>{
      let quantity = (item.quantity || 0) + change;
      if(quantity ===0) item$.remove();
      else
         item$.update({
         title: product.title, 
         imageUrl: product.imageUrl,
         price:product.price,
         quantity: quantity});
    })
  }

}
