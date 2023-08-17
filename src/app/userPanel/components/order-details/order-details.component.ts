import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/Model/Order.model';
import { OrderDetails } from 'src/app/Model/OrderDetails.model';
import { OrderService } from 'src/app/service/orderService/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  displayedColumns: string[] = ['Id','Product Name', 'Quantity','Price',  'Total Cost'];
  dataSource!: MatTableDataSource<OrderDetails>;

  orderData:Order[] | undefined
  orderId!: number;

  constructor(private orderService:OrderService,
    private router:Router,
    private route: ActivatedRoute,){};

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['orderid'];
   this.orderDetailsList();
  
  }

  orderDetailsList(){
this.orderService.orderDetailsList( this.orderId).subscribe((data:OrderDetails[])=>{
  this.dataSource= new MatTableDataSource (data);


})

  }




}
