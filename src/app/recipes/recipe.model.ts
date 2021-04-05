import { Product } from '../shared/product.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public products: Product[];

  constructor(name: string, desc: string, imagePath: string, products: Product[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.products = products;
  }
}
