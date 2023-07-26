import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Product } from 'src/app/Model/product.model';

const headerOption = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData1 = new EventEmitter<Product[] | []>();

  dataUrl = 'http://localhost:8080/p1/product';

  currentProduct: Product = new Product();
  panelOpenState = false;

  constructor(  private http: HttpClient) { }

  private refreshNeeded = new Subject<void>();

  get refreshNeed() {
    return this.refreshNeeded;
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl+'/getAll', headerOption);
  }


  getById(pid: number): Observable<Product> {
    return this.http.get<Product>(this.dataUrl + '/getById/' + pid, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.dataUrl+'/post', product, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.dataUrl + '/update', product, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  deleteProduct(pid: number): Observable<Product> {
    return this.http.delete<Product>(this.dataUrl + '/delete/' + pid, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

 // localStorege add to cart
 localAddToCart(data:Product){
  let cartData = [];
  let localCart = localStorage.getItem('localCart');
  if(!localCart){
    localStorage.setItem('localCart',JSON.stringify([data]));
    this.cartData1.emit([data]);
  }else{
    cartData = JSON.parse(localCart);
    cartData.push(data);
    localStorage.setItem('localCart',JSON.stringify(cartData));
    this.cartData1.emit(cartData);

  }
}


  //prodcut remove from localStorage
  removeItemFromCart(productId:Number){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:Product[]=JSON.parse(cartData);
      items = items.filter((item:Product)=> productId!==item.id);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData1.emit(items);
    }
  }
  
 //cart data show from localStorage
 getCartFromLocal(){
  let cartData = [];
  let localCart = localStorage.getItem('localCart');
  if(localCart){
    cartData = JSON.parse(localCart);
  }
  return cartData;

}

}
