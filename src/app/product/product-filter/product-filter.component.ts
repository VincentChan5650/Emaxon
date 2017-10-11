import { CategoryService } from '../../services/category.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent{

  categories$;
  @Input('category') category;
  constructor(
    categoryService: CategoryService
  ) { 

    this.categories$ = categoryService.getAll();
  }



  

}
