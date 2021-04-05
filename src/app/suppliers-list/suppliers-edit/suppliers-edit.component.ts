import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Supplier } from '../../shared/supplier.model';
import { SuppliersListService } from '../suppliers-list.service';

@Component({
  selector: 'app-suppliers-edit',
  templateUrl: './suppliers-edit.component.html',
  styleUrls: ['./suppliers-edit.component.css']
})
export class SuppliersEditComponent implements OnInit, OnDestroy {
  @ViewChild('editSupplier', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Supplier;

  constructor(private slService: SuppliersListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getSupplier(index);
          this.slForm.setValue({
            id: this.editedItem.id,
            name: this.editedItem.name,
            products: this.editedItem.products,
            user: this.editedItem.user
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newSupplier = new Supplier(value.id, value.name, value.products, value.user);
    if (this.editMode) {
      this.slService.updateSupplier(this.editedItemIndex, newSupplier);
    } else {
      this.slService.addSupplier(newSupplier);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteSupplier(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
