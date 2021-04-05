import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Product } from '../../shared/product.model';
import { ProductsListService } from '../products-list.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit, OnDestroy {
  @ViewChild('editProduct', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Product;

  constructor(private slService: ProductsListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getProduct(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            quantity: this.editedItem.quantity,
            days: this.editedItem.days
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newProduct = new Product(value.name, value.amount, value.quantity, value.days);
    if (this.editMode) {
      this.slService.updateProduct(this.editedItemIndex, newProduct);
    } else {
      this.slService.addProduct(newProduct);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteProduct(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
