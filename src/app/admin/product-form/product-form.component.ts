import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import "rxjs/add/operator/take";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product={};
  id;

  constructor(
    private router: Router,
    private categoryService:CategoryService,
    private productService:ProductService,
    private route:ActivatedRoute
  ) { 
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      //after subscribe, we need to make some unsubscribe action(one time)
      //use take from rxjs, take 1 item 1 time
      this.productService.get(this.id).take(1).subscribe(p=> this.product = p);
    }
  }

  ngOnInit() {
  }

  save(product){
    if(this.id){
      this.productService.update(this.id, product);
      this.router.navigate(['/admin/products']);
    }else{  
      this.productService.create(product);
      this.router.navigate(['/admin/products']);
    }
  }
  delete(){
    if(confirm("Are you sure to delete this product?")){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
