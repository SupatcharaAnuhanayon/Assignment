import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageService } from '../../shared/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SubmitAssignmentService {
  private score = new BehaviorSubject<any>(null);
  score$ = this.score.asObservable();
  constructor(
    private http: HttpClient,
    private storage: SessionStorageService
  ) {}

  getSubmit(body:any): Observable<any> {
    console.log(this.storage.getUser());
    let option = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.storage.getUser().accessToken
      )
    }
    const path =
      'https://training-homework.calllab.net/v1/questions/submit-assignment';
    return this.http.post(path,body,option );
  }

  setScore(score:number){
    this.score.next(score);
  }
}
