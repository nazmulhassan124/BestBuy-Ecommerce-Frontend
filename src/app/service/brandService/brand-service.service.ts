import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Brand } from 'src/app/Model/brand.model';


const headerOption = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {

  dataUrl = 'http://localhost:8080/p1/brand';

  panelOpenState = false;

  currentBrand: Brand = new Brand();

 
  constructor(   private http: HttpClient) { }

  private refreshNeeded = new Subject<void>();

  get refreshNeed() {
    return this.refreshNeeded;
  }


 //get category wise Brand
 getCatWiseBrand(catid:any): Observable<Brand[]> {
  return this.http.get<Brand[]>(this.dataUrl+'/getCatwiseBrand?catId='+catid, headerOption);
}


  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.dataUrl+'/getAll', headerOption);
  }

  delete(catid: number): Observable<Brand> {
    return this.http.delete<Brand>(this.dataUrl + '/delete/' + catid, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  create(cat: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.dataUrl+ '/post', cat, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  update(cat: Brand): Observable<Brand> {
    return this.http.put<Brand>(this.dataUrl + '/update', cat, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

}
