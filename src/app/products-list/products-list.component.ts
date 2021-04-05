import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../shared/product.model';
import { ProductsListService } from './products-list.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[];
  private subscription: Subscription;

  constructor(private slService: ProductsListService) { }

  ngOnInit() {
    this.products = this.slService.getProducts();
    this.subscription = this.slService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
