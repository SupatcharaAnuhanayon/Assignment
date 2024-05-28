import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
public static readonly USER_KEY = 'user-auth';
private isLogged = new BehaviorSubject<any>(false);
isLogged$ = this.isLogged.asObservable();

  constructor() { }

  setUser(token:any){
    sessionStorage.removeItem(SessionStorageService.USER_KEY)
    sessionStorage.setItem(SessionStorageService.USER_KEY,JSON.stringify(token))
    this.isLogged.next(true)
  }

  getUser():any {
    if(!sessionStorage.getItem(SessionStorageService.USER_KEY))
    {
      return ""
    }
    return JSON.parse(sessionStorage.getItem(SessionStorageService.USER_KEY)!) 
  }
  
  removeUser() {
    this.isLogged.next(false)
    sessionStorage.removeItem(SessionStorageService.USER_KEY)
  }

  isLoggedIn():boolean {
    this.isLogged.next(sessionStorage.getItem(SessionStorageService.USER_KEY) !== null)
    return sessionStorage.getItem(SessionStorageService.USER_KEY) !== null
    
  }
}
