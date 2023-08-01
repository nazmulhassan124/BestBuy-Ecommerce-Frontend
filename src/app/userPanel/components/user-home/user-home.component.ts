import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/Model/brand.model';
import { Cart } from 'src/app/Model/cart.model';
import { Category } from 'src/app/Model/category.model';
import { Product } from 'src/app/Model/product.model';
import { SubCategory } from 'src/app/Model/subCategory.model';
import { AddtoCartService } from 'src/app/service/addtoCart/addto-cart.service';
import { HomeService } from 'src/app/service/homeService/home.service';
import { ProductService } from 'src/app/service/productService/product.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit{

  productQuantity: number = 1;

  allProduct!:Product[];
  allCategory !: Category [];
  allBrand!: Brand[];
  allSubcat!:SubCategory[];
  cartproduct: Product = new Product;

  constructor(
    public homeService: HomeService,
    public productService: ProductService,
    public cartService: AddtoCartService,
    public router:Router,
    
  ) { }

  ngOnInit(): void {

    this.homeService.getAllProduct().subscribe((data: Product[])=>{
      this.allProduct=data;
     });

     this.homeService.getAllCategory().subscribe((data: Category[])=>{
      this.allCategory=data;
     });

     this.homeService.getAllSubCat().subscribe((data: SubCategory[])=>{
      this.allSubcat=data;
      console.log(this.allSubcat)
     });

     this.homeService.getAllBrand().subscribe((data: Brand[])=>{
      this.allBrand=data;
     });

  }

  addToCart(cartPro : Product) {
    this.cartproduct=cartPro;

    if (this.cartproduct) {
      this.cartproduct.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.router.navigateByUrl('/login');
        // this.productService.localAddToCart(this.cartproduct);
     
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).userId
        let cartData: Cart = {
          ...this.cartproduct,
          userId,
          cart_id: undefined,

        }

        this.cartService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.cartService.getCartList(userId);
           
          }
        });

      }
    //  alert("Add to cart Completed!!")
      // this.router.navigate(['/card'])
     // this.ngOnInit();
    }
  }


}
