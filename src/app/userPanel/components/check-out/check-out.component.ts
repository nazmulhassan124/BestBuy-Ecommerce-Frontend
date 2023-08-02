import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/Model/Order.model';
import { OrderDetails } from 'src/app/Model/OrderDetails.model';
import { Cart } from 'src/app/Model/cart.model';
import { AddtoCartService } from 'src/app/service/addtoCart/addto-cart.service';
import { OrderService } from 'src/app/service/orderService/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  totalPrice: number | undefined
  nitPrice: number = 0;
  otherCost: number | undefined
  cartData: Cart[] | undefined;
  orderDetailsData: OrderDetails[] = [];
  orderdetail!: OrderDetails

  constructor(
    private cartService: AddtoCartService,
    private orderService: OrderService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.cartService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.regularPrice * +item.quantity);
        }
      });
      this.nitPrice = price;
      this.totalPrice = +(price + 100 + (price * .10) - (price * .0)).toFixed(3);
      this.otherCost = this.totalPrice - this.nitPrice
    });


  }

  orderNow(data: Order) {


    this.cartData?.forEach((item) => {

      this.orderdetail = {
        cart_id: item.cart_id,
        userId: item.userId,
        catId: item.catId,

        id: item.id,
        name: item.name,
        catName: item.catName,
        productImage_1: item.productImage_1,
        regularPrice: item.regularPrice,
        offerPrice: item.offerPrice,
        description: item.description,
        quantity: item.quantity
      };
      this.orderDetailsData.push(this.orderdetail);

    })




    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).userId;
    if (this.totalPrice) {
      let orderData: Order = {
        ...data,
        orderDetails: this.orderDetailsData,    //For One to many relationship
        nitPrice: this.nitPrice,
        totalPrice: this.totalPrice,
        userId,
        status: 'Pending for appruval'
      }
      this.orderService.orderNow(orderData).subscribe((result) => {
        if (result) {
          //  alert("Order Placed")
          window.print();
          this.router.navigate(['/userOrder']);
        }

      })
    }

  }

}
