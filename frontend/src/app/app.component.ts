import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { environment } from '@org/shared';
@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  constructor() {
    // console.log(process.env);
    fetch(environment.API_URL)
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error();
      })
      .then((d) => console.log(d))
      .catch((e) => console.log(e));
    console.log(environment.API_URL);
    console.log('bilo sta');
  }
}
