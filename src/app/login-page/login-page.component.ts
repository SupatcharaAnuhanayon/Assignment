import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { LoginService } from './services/login.service';
import { SessionStorageService } from '../shared/session-storage.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  providers: [LoginService ]
})
export class LoginPageComponent {
  constructor(private formBuilder: FormBuilder , private loginService:LoginService ,private storage: SessionStorageService , private router:Router) {
    this.username = '';
    this.password = '';
  }
  username: '';
  password: '';

  onSubmit(): void {
    console.log(this.username);
    console.log(this.password);
    this.loginService.login(this.username,this.password).subscribe(loginResponse => {
    console.log(loginResponse);
   this.storage.setUser(loginResponse.data);

   this.router.navigate([''])
    } )
  }
}
