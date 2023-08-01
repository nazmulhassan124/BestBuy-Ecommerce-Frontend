import { Component } from '@angular/core';
import { Order } from 'src/app/Model/Order.model';
import { OrderService } from 'src/app/service/orderService/order.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent {
  orderData:Order[] | undefined
  
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.orderList().subscribe((result)=>{
      this.orderData = result;
    })
    
    
  };


}
