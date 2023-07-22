import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { SubCategory } from 'src/app/Model/subCategory.model';

const headerOption = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  dataUrl = 'http://localhost:8080/p1/subCat';

  panelOpenState = false;

  currentSubCategory: SubCategory = new SubCategory();

  constructor(   private http: HttpClient) { }

  private refreshNeeded = new Subject<void>();

  get refreshNeed() {
    return this.refreshNeeded;
  }


  getAll(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.dataUrl+'/getAll', headerOption);
  }

  delete(catid: number): Observable<SubCategory> {
    return this.http.delete<SubCategory>(this.dataUrl + '/delete/' + catid, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  create(cat: SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>(this.dataUrl+ '/post', cat, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  update(cat: SubCategory): Observable<SubCategory> {
    return this.http.put<SubCategory>(this.dataUrl + '/update', cat, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }



}
