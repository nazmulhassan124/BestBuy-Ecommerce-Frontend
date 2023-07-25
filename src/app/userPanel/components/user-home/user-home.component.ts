import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/Model/brand.model';
import { Category } from 'src/app/Model/category.model';
import { Product } from 'src/app/Model/product.model';
import { SubCategory } from 'src/app/Model/subCategory.model';
import { HomeService } from 'src/app/service/homeService/home.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit{

  allProduct!:Product[];
  allCategory !: Category [];
  allBrand!: Brand[];
  allSubcat!:SubCategory[];

  constructor(
    public homeService: HomeService,
    
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

}
