import { Product } from '../shared/product.model';
import { Subject } from 'rxjs';

export class ProductsListService {
  productsChanged = new Subject<Product[]>();
  startedEditing = new Subject<number>();
  private products: Product[] = [
    new Product('Product name 1', 5, 10, 15),
    new Product('Product name 2', 10, 11, 19),
    new Product('Product name 3', 8, 3, 8),
  ];

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products[index];
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  addProducts(products: Product[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.products.push(...products);
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(index: number, newProduct: Product) {
    this.products[index] = newProduct;
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }
}
