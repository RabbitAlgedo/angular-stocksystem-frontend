import { Order } from '../shared/order.model';
import { Subject } from 'rxjs';

export class OrdersListService {
  ordersChanged = new Subject<Order[]>();
  startedEditing = new Subject<number>();
  private orders: Order[] = [
    new Order(1, 'Buy products', '{"Product 1": 3, "Product 2": 4,}', 3),
    new Order(2, 'Buy products', '{"Product 3": 3, "Product 1": 4,}', 2),
    new Order(3, 'Buy products', '{"Product 1": 3, "Product 3": 4,}', 5),
  ];

  getOrders() {
    return this.orders.slice();
  }

  getOrder(index: number) {
    return this.orders[index];
  }

  addOrder(order: Order) {
    this.orders.push(order);
    this.ordersChanged.next(this.orders.slice());
  }

  addOrders(orders: Order[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.orders.push(...orders);
    this.ordersChanged.next(this.orders.slice());
  }

  updateOrder(index: number, newOrder: Order) {
    this.orders[index] = newOrder;
    this.ordersChanged.next(this.orders.slice());
  }

  deleteOrder(index: number) {
    this.orders.splice(index, 1);
    this.ordersChanged.next(this.orders.slice());
  }
}
