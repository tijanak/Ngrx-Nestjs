import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { selectAuthFeature } from './store/auth/auth.selectors';

@Component({
  standalone: true,
  imports: [RouterModule, LoginComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'aukcije';
  constructor() {}
  ngOnInit(): void {}
}
