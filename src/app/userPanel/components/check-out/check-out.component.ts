import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/Model/Order.model';
import { AddtoCartService } from 'src/app/service/addtoCart/addto-cart.service';
import { OrderService } from 'src/app/service/orderService/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{

  totalPrice:number | undefined
  constructor(
    private cartService:AddtoCartService ,
    private orderService:OrderService,
    private router:Router
    ) { }
  ngOnInit(): void {
    this.cartService.currentCart().subscribe((result) => {
      let price = 0;
      result.forEach((item) => {
        if(item.quantity){
          price = price + (+item.regularPrice* +item.quantity);
        }
      });
     this.totalPrice = +(price+100+(price*.10)-(price*.0)).toFixed(3);
    });

   
  }

  orderNow(data:Order){

    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).userId;
    if(this.totalPrice){
      let orderData:Order = {
        ...data,
        totalPrice:this.totalPrice,
        userId,
        status:'In Progress'
      }
      this.orderService.orderNow(orderData).subscribe((result)=>{
        if(result){
          alert("Order Placed")
          window.print();
          this.router.navigate(['/myOrder']);
        }
        
      })
    }

  }

}
