import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../../shared/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private storage: SessionStorageService
  ) {}

  getCategory(categoryId:string): Observable<any> {
    console.log(this.storage.getUser());
    let option = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.storage.getUser().accessToken
      )
    }
    const path =
      'https://training-homework.calllab.net/v1/questions/categories/'+categoryId;
    return this.http.get(path, option );
  }
}
