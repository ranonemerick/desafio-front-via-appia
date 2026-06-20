import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthorService } from '../../services/author/author.service';
import { Author } from '../../models/author.model';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-author',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss',
})
export class AuthorComponent {
  private authorService = inject(AuthorService);
  private notificationService = inject(NotificationService);

  authors: Author[] = [];

  currentPage = 0;
  totalPages = 0;

  isFormVisible: boolean = false;
  
  editingAuthor: any = null;

  newAuthor: any = {name: '', nationality: '', books: []}

  ngOnInit() {
    this.loadAuthors(0);
  }

  createNewAuthor() {
    this.authorService.createAuthor(this.newAuthor).subscribe({
      next: () => {
        this.notificationService.show("Autor criado com sucesso! ", "success");
        this.loadAuthors(0);
        this.newAuthor = {name: '', nationality: '', books: []}
        this.isFormVisible = false;
      },
      error: (err) => {
        this.notificationService.show("Erro ao cadastrar autor! ", "error")
      },
    });
  }

updateExistingAuthor() {
  this.authorService.updateAuthor(this.newAuthor.id, this.newAuthor).subscribe({
    next: () => {
      this.notificationService.show("Autor atualizado com sucesso! ", "success");
      this.loadAuthors(0);
      this.resetForm();
    },
    error: (err) => {
      this.notificationService.show("Erro ao atualizar autor! ", "error");
      console.error(err);
    }
  });
}

  updateAuthor(author : any | undefined) {
    this.editingAuthor = {...author};
    this.newAuthor = {
      ...author
    };
    this.isFormVisible = true;
  }

deleteAuthor(id: string | undefined) {
  if (!id) {
    return; 
  }

  if (confirm('Tem certeza que deseja excluir este autor?')) {
    this.authorService.deleteAuthor(id).subscribe({
      next: () => {
        this.notificationService.show("Autor excluído com sucesso!", "success");
        this.loadAuthors(0);
      },
      error: (err) => {
        this.notificationService.show("Erro ao excluir autor.", "error");
      }
    });
  }
}
  
  loadAuthors(page : number) {
    this.authorService.getAuthorsByActive(page, 10).subscribe( response => {
      this.authors = response.content;
      this.currentPage = response.number;
      this.totalPages = response.totalPages;
    })
  }

  resetForm() {
    this.newAuthor = {name: '', nationality: '', books: []}
    this.editingAuthor = null;
    this.isFormVisible = false;
  }

}
 