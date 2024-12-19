import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './sevices/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'signal-ex06';

  authService = inject(AuthService);

  isLoggedIn = this.authService.isLoggedIn;

  onLogout() {
    this.authService.logout();
  }
}
