import { Component } from '@angular/core';
import { Order } from 'src/app/Model/Order.model';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent {
  orderData:Order[] | undefined

}
