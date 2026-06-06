import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  credentials = {login: '', password: ''};

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        console.log('Token recebido:', res.token);
        alert('Login realizado com sucesso');
        this.router.navigate(['/dasboard'])
      },
      error: (err) => {
        alert('Erro ao autenticar: Verifique suas credencias.')
      }
    });
  }


}
