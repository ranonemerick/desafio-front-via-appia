import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  totalBooks: number = 0;
  totalAuthors: number = 0;
  totalUsers: number = 0;

  ngOnInit() {
    this.totalBooks = 145;
    this.totalAuthors = 32;
    this.totalUsers = 8;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear(); 
    this.notificationService.show("Sessão encerrada com sucesso.", "success");
    this.router.navigate(['/login']);
  }

}