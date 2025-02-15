import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/Model/cart.model';
import { Product } from 'src/app/Model/product.model';
import { AddtoCartService } from 'src/app/service/addtoCart/addto-cart.service';
import { HomeService } from 'src/app/service/homeService/home.service';
import { ProductService } from 'src/app/service/productService/product.service';

@Component({
  selector: 'app-single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.css']
})
export class SingleProductViewComponent implements OnInit{

  id!: number;
  allProduct: Product = new Product;
  productQuantity: number = 1;
   removeCart = false;
  cartData!: Product;


  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    public cartService: AddtoCartService,
    private router:Router,
    private homeService : HomeService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['proid'];
    this.homeService.getById(this.id).subscribe((data: Product) => {
      this.allProduct = data;

      let cartData = localStorage.getItem('localCart');
      if (this.id && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => this.id == item.id)
        if (items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }

      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).userId;
        this.cartService.getCartList(userId);

        this.cartService.cartData.subscribe((result) => {
          let item = result.filter((item: Product) => this.id?.toString() === item.id?.toString());
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }

    })
   
  }



  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }


  addToCart() {
    if (this.allProduct) {
      this.allProduct.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.router.navigateByUrl('/login');

        // this.productService.localAddToCart(this.allProduct);
        // this.removeCart = true
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
      // this.router.navigate(['/card'])
      this.ngOnInit();
    }
  }


  removeToCart(pro_id: number) {
    if (!localStorage.getItem('user')) {

      this.productService.removeItemFromCart(pro_id);
      this.removeCart = false;
    }  else if(localStorage.getItem('user')) {

      this.cartService.removeToCart(this.cartData.cart_id)
        .subscribe((result) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.cartService.getCartList(userId)
        })
    }
    this.removeCart = false
    alert("Remove to cart Completed!!")
  }



}
