import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(username: string , password:string) :Observable<any>{
    const path = "https://training-homework.calllab.net/v1/login"
    return this.http.post(path,{username,password})
  }
}
