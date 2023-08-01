import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceSummery } from 'src/app/Model/PriceSummery.model';
import { Cart } from 'src/app/Model/cart.model';
import { Product } from 'src/app/Model/product.model';
import { AddtoCartService } from 'src/app/service/addtoCart/addto-cart.service';
import { ProductService } from 'src/app/service/productService/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  checkoutbutton = false;

  cartData: Cart[] | undefined;
  priceSummery: PriceSummery = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };

  constructor(private cartService: AddtoCartService, 
    private productService:ProductService,
    private router:Router
    ){ }

     
  ngOnInit(): void {
    this.loadDetails();
    if(localStorage.getItem('user')){
      this.checkoutbutton=true;
      
    }

  }

  removeToCart(cartId:number|undefined){
    console.log("cart id"+cartId)
    cartId && this.cartData && this.cartService.removeToCart(cartId)
    .subscribe((result)=>{
      this.loadDetails();
    })
  }


  loadDetails(){
    if(localStorage.getItem('user')){
      this.cartService.currentCart().subscribe((result) => {
        this.cartData = result;
        let price = 0;
        result.forEach((item) => {
          if(item.quantity){
            price = price + (+item.regularPrice* +item.quantity);
          }
        });
        this.priceSummery.price = price;
        this.priceSummery.discount=price*.0;
        this.priceSummery.tax = +(price*.10).toFixed(3);
        this.priceSummery.delivery = 100;
        this.priceSummery.total = price+100+(price*.10)-(this.priceSummery.discount);
        this.priceSummery.total =+ this.priceSummery.total.toFixed(3)
      });
    }else{
      let result = this.productService.getCartFromLocal();
      this.cartData = result;
      let price = 0;
      result.forEach((item: { quantity: string | number; regularPrice: string | number; }) => {
        if(item.quantity){
          price = price + (+item.regularPrice* +item.quantity);
        }
        
      });
      this.priceSummery.price = price;
      this.priceSummery.discount=price*.0;
      this.priceSummery.tax = +(price*.10).toFixed(3);
      this.priceSummery.delivery = 100;
      this.priceSummery.total = price+100+(price*.10)-(this.priceSummery.discount);
      this.priceSummery.total =+ this.priceSummery.total.toFixed(3)
    }
  }

  removeToCart2(pro_id: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(pro_id);
      this.ngOnInit();
    } 
    
  }


  redirectToCheckoutPage(){
    if(localStorage.getItem('user')){
      localStorage.setItem('totalPrice',JSON.stringify(this.priceSummery.total));
      
      this.router.navigate(['/checkout'])
    }
  }



}
