import { Product } from '../shared/product.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  productsChanged = new Subject<Product[]>();
  startedEditing = new Subject<number>();
  private products: Product[] = [
    new Product('Product name 1', 5, 10, 15),
    new Product('Product name 2', 10, 11, 19),
    new Product('Product name 3', 8, 3, 8),
  ];

  getIngredients() {
    return this.products.slice();
  }

  getIngredient(index: number) {
    return this.products[index];
  }

  addIngredient(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  addIngredients(products: Product[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.products.push(...products);
    this.productsChanged.next(this.products.slice());
  }

  updateIngredient(index: number, newIngredient: Product) {
    this.products[index] = newIngredient;
    this.productsChanged.next(this.products.slice());
  }

  deleteIngredient(index: number) {
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }
}
