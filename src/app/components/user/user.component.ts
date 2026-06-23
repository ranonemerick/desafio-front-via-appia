import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { NotificationService } from '../../services/notification/notification.service';
import { User } from '../../models/user.model';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ConfirmModalComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);

  users: User[] = [];

  isFormVisible: boolean = false;
  isConfirmModalVisible = false;
  userIdToDelete: string | null = null;

  newUser: any = { login: '', password: '', name: '', email: '', role: 'USER' };

  ngOnInit() {

  }

  createNewUser() {
    this.userService.registerUser(this.newUser).subscribe({
      next: () => {
        this.notificationService.show("Usuário registrado com sucesso!", "success");
        this.resetForm();
      },
      error: (err) => {
        this.notificationService.show("Erro ao registrar usuário!", "error");
      },
    })
  }

  resetForm() {
    this.newUser = { login: '', password: '', name: '', email: '', role: 'USER' };
    this.isFormVisible = false;
  }

  closeConfirmModal() {
    this.isConfirmModalVisible = false;
    this.userIdToDelete = null;
  }

}
