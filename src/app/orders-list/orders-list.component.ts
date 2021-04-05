import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Order } from '../shared/order.model';
import { OrdersListService } from './orders-list.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: Order[];
  private subscription: Subscription;

  constructor(private slService: OrdersListService) { }

  ngOnInit() {
    this.orders = this.slService.getOrders();
    this.subscription = this.slService.ordersChanged
      .subscribe(
        (orders: Order[]) => {
          this.orders = orders;
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
