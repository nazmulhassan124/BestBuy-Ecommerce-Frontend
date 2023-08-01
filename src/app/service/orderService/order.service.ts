import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/Model/Order.model';

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

  getAllOrderList() {
    return this.http.get<Order[]>(this.dataUrl+'/getAllOrderList')
 
  }

  updateStatus(id:number, status:string){
    return this.http.post(this.dataUrl+'/updateStatus?orderId=' + id+'&status='+status,{
      observe: 'response'
    });
  }


}
