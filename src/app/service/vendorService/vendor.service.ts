import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Vendor } from 'src/app/Model/vendor.model';
import { UserAuthService } from 'src/app/Security/_service/user-auth.service';




@Injectable({
  providedIn: 'root'
})

export class VendorService {


  private appendToken(headers: HttpHeaders): HttpHeaders {
    const token = this.userAuth.getToken();
    if (token) {
      return headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }


  dataUrl = 'http://localhost:8080/p1/vendor';

  
  panelOpenState = false;

  currentVendor: Vendor = new Vendor();

  constructor(
    private http: HttpClient,
    private userAuth: UserAuthService
  ) { }
  private refreshNeeded = new Subject<void>();

  get refreshNeed() {
    return this.refreshNeeded;
  }

  createVendor(cat: Vendor): Observable<Vendor> {

    const headers = new HttpHeaders();
    const headersWithToken = this.appendToken(headers);

    return this.http.post<Vendor>(this.dataUrl+ '/post', cat, { headers: headersWithToken }).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  getAllVendor(): Observable<Vendor[]> {

    const headers = new HttpHeaders();
    const headersWithToken = this.appendToken(headers);

    return this.http.get<Vendor[]>(this.dataUrl+'/getAll', { headers: headersWithToken });
  }

  deleteVendor(catid: number): Observable<Vendor> {
    const headers = new HttpHeaders();
    const headersWithToken = this.appendToken(headers);
    

    return this.http.delete<Vendor>(this.dataUrl + '/delete/' + catid,  { headers: headersWithToken }).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }


  updateVendor(cat: Vendor): Observable<Vendor> {
    const headers = new HttpHeaders();
    const headersWithToken = this.appendToken(headers);
    

    return this.http.put<Vendor>(this.dataUrl + '/update', cat,  { headers: headersWithToken }).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

}
