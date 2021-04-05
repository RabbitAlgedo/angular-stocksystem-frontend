import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Order } from '../../shared/order.model';
import { OrdersListService } from '../orders-list.service';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.css']
})
export class OrdersEditComponent implements OnInit, OnDestroy {
  @ViewChild('editOrder', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Order;

  constructor(private slService: OrdersListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getOrder(index);
          this.slForm.setValue({
            id: this.editedItem.id,
            name: this.editedItem.name,
            products: this.editedItem.products,
            supplier: this.editedItem.supplier
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newOrder = new Order(value.id, value.name, value.products, value.supplier);
    if (this.editMode) {
      this.slService.updateOrder(this.editedItemIndex, newOrder);
    } else {
      this.slService.addOrder(newOrder);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteOrder(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
