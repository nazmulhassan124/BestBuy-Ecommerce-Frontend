import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  id!: number;
  allProduct: Product = new Product;
   productQuantity: number = 1;
   removeCart = false;
  cartData!: Product;

  constructor( public productService: ProductService,
    private route: ActivatedRoute,
    public cartService: AddtoCartService,
    private router:Router){}

  ngOnInit(): void {
   
  }





    addToCart() {
      if (this.allProduct) {
        this.allProduct.quantity = this.productQuantity;
        if (!localStorage.getItem('user')) {
        //  this.productService.localAddToCart(this.allProduct);
          this.removeCart = true
        } else {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).userId
          let cartData: Cart = {
            ...this.allProduct,
            userId,
            cart_id: undefined,
  
          }
  
          this.cartService.addToCart(cartData).subscribe((result) => {
            if (result) {
              this.cartService.getCartList(userId);
              this.removeCart = true;
            }
          });
  
        }
        // alert("Add to cart Completed!!")
      //  this.router.navigate(['/card'])
       // this.ngOnInit();
      }
    }

  

}
