import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Supplier } from '../shared/supplier.model';
import { SuppliersListService } from './suppliers-list.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent implements OnInit, OnDestroy {
  suppliers: Supplier[];
  private subscription: Subscription;

  constructor(private slService: SuppliersListService) { }

  ngOnInit() {
    this.suppliers = this.slService.getSuppliers();
    this.subscription = this.slService.suppliersChanged
      .subscribe(
        (suppliers: Supplier[]) => {
          this.suppliers = suppliers;
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
