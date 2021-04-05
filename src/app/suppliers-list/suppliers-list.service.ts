import { Supplier } from '../shared/supplier.model';
import { Subject } from 'rxjs';

export class SuppliersListService {
  suppliersChanged = new Subject<Supplier[]>();
  startedEditing = new Subject<number>();
  private suppliers: Supplier[] = [
    new Supplier(11, 'Evgen Otshev', '{"Product 1": 3, "Product 2": 4,}', 1),
    new Supplier(21, 'Nazar Yankis', '{"Product 3": 3, "Product 1": 4,}', 2),
    new Supplier(33, 'Orest Davling', '{"Product 1": 3, "Product 3": 4,}', 3),
  ];

  getSuppliers() {
    return this.suppliers.slice();
  }

  getSupplier(index: number) {
    return this.suppliers[index];
  }

  addSupplier(supplier: Supplier) {
    this.suppliers.push(supplier);
    this.suppliersChanged.next(this.suppliers.slice());
  }

  addSuppliers(suppliers: Supplier[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.suppliers.push(...suppliers);
    this.suppliersChanged.next(this.suppliers.slice());
  }

  updateSupplier(index: number, newSupplier: Supplier) {
    this.suppliers[index] = newSupplier;
    this.suppliersChanged.next(this.suppliers.slice());
  }

  deleteSupplier(index: number) {
    this.suppliers.splice(index, 1);
    this.suppliersChanged.next(this.suppliers.slice());
  }
}
