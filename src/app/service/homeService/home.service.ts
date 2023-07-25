import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/Model/brand.model';
import { Category } from 'src/app/Model/category.model';
import { Product } from 'src/app/Model/product.model';
import { SubCategory } from 'src/app/Model/subCategory.model';

const headerOption = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {
   dataUrl = 'http://localhost:8080/p2';

  constructor(private http: HttpClient) { }

   getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl+'/getAllProduct', headerOption);
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.dataUrl+'/getAllCategory', headerOption);
  }

  getAllSubCat(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.dataUrl+'/getAllSubCat', headerOption);
  }
  getAllBrand(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.dataUrl+'/getAllBrand', headerOption);
  }
}
