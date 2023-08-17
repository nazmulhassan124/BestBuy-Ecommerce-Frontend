import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/Model/Order.model';
import { OrderDetails } from 'src/app/Model/OrderDetails.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  dataUrl = 'http://localhost:8080/order';

  constructor( private http:HttpClient) { }


  orderNow(data:Order){
    return this.http.post(this.dataUrl+'/post',data);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>(this.dataUrl+'/getOrderList?userId=' + userData.userId )
 
  }

  orderDetails(orderId : number ) {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order>(this.dataUrl+'/getOrderDetails?userId=' + userData.userId +'&orderId='+ orderId)
 
  }

  orderDetailsList(orderId : number ) {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<OrderDetails[]>(this.dataUrl+'/getOrderDetailsList?userId=' + userData.userId +'&order_id_fk='+ orderId)
 
  }

  getAllOrderList() {
    return this.http.get<Order[]>(this.dataUrl+'/getAllOrderList')
 
  }

  updateStatus(id:number, status:string){
    return this.http.post(this.dataUrl+'/updateStatus?orderId=' + id+'&status='+status,{
      observe: 'response'
    });
  }


}
