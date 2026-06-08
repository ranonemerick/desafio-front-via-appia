import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router)
  private notificationService = inject(NotificationService);

  credentials = {login: '', password: ''};

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.notificationService.show("Login realizado com sucesso", "success");
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this.notificationService.show("'Erro ao autenticar: Verifique suas credencias.", "error");
      }
    });
  }


}
