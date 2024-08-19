import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MessageSnackbarComponent } from './components/message-snackbar/message-snackbar.component';

@Component({
  standalone: true,
  imports: [RouterModule, LoginComponent, MessageSnackbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'aukcije';
  constructor() {}
  ngOnInit(): void {}
}
