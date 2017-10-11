import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { Subscription } from 'rxjs/Rx';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy { 
  shipping = {};
  cart: ShoppingCart;
  CartSubscription:Subscription;
  UserSubscription:Subscription;
  userId:string 

  constructor(
    private router:Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService:OrderService
  ){}
  
   placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    this.orderService.placeOrder(order).then((result)=>{
      this.router.navigate(['/order-success', result.key]);
    })
    
  }
  
  async ngOnInit(){
    let cart$ = await this.shoppingCartService.getCart();
    this.CartSubscription = cart$.subscribe(cart=>this.cart = cart);
    this.UserSubscription =  this.authService.user$.subscribe(user=>this.userId = user.uid);
  }

  ngOnDestroy(){
    this.CartSubscription.unsubscribe();
    this.UserSubscription.unsubscribe();
  }
}
