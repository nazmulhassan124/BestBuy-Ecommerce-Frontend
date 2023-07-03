import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Category } from 'src/app/Model/category.model';

const headerOption = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  dataUrl = 'http://localhost:8080/p1/category';

  panelOpenState = false;

  currentCategory: Category = new Category();

  constructor(
    private http: HttpClient
  ) { }



  private refreshNeeded = new Subject<void>();

  get refreshNeed() {
    return this.refreshNeeded;
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.dataUrl+'/getAll', headerOption);
  }

  deleteCategory(catid: number): Observable<Category> {
    return this.http.delete<Category>(this.dataUrl + '/delete/' + catid, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  createCategory(cat: Category): Observable<Category> {
    return this.http.post<Category>(this.dataUrl+ '/post', cat, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  updateCategory(cat: Category): Observable<Category> {
    return this.http.put<Category>(this.dataUrl + '/update', cat, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }


}
