import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SessionStorageService } from './shared/session-storage.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name = "pop love gear kear kia"
  isLogged : Observable<boolean>
  title = 'final-project';
  constructor(private sessionStorageService: SessionStorageService , private route: Router){
    this.name =sessionStorageService.getUser().fullName;
    this.isLogged = sessionStorageService.isLogged$;
    
  }
  ngOnInit(): void {
    this.isLogged = this.sessionStorageService.isLogged$;
  }

  logOut() {
    this.sessionStorageService.removeUser();
    this.route.navigate(['login'])
  }
}
