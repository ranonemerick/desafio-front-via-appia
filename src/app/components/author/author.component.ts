import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthorService } from '../../services/author/author.service';
import { Author } from '../../models/author.model';
import { NotificationService } from '../../services/notification/notification.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-author',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ConfirmModalComponent
  ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss',
})
export class AuthorComponent {
  private authorService = inject(AuthorService);
  private notificationService = inject(NotificationService);

  authors: Author[] = [];

  searchTerm: string = '';
  currentSort: string = 'name,asc';
  private searchSubject = new Subject<string>();

  currentPage = 0;
  totalPages = 0;

  isConfirmModalVisible = false;
  authorIdToDelete: string | null = null;

  isFormVisible: boolean = false;
  
  editingAuthor: any = null;

  newAuthor: any = {name: '', nationality: '', books: []}

ngOnInit() {
    this.loadAuthors(0);
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.searchTerm = searchText;
      this.applyFilter(); 
    });
  }

  onSearchType(text: string) {
    this.searchSubject.next(text);
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

deleteAuthor() {
  if (!this.authorIdToDelete) return;

  this.authorService.deleteAuthor(this.authorIdToDelete).subscribe({
    next: () => {
      this.notificationService.show("Autor excluído com sucesso!", "success");
      this.loadAuthors(0);
      this.closeConfirmModal();
    },
    error: (err) => {
      this.notificationService.show("Erro ao excluir autor!", "error");
      this.closeConfirmModal();
    }
  })
}
  
loadAuthors(page : number) {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.authorService.getAuthorsByParams(this.searchTerm, '', page, 10, this.currentSort).subscribe((response : any) => {
        this.authors = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
      });
    } else {
      this.authorService.getAuthorsByActive(page, 10, this.currentSort).subscribe((response : any) => {
        this.authors = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
      });
    }
  }

  resetForm() {
    this.newAuthor = {name: '', nationality: '', books: []}
    this.editingAuthor = null;
    this.isFormVisible = false;
  }

  openDeleteConfirmation(id : string |  undefined) {
    if(!id) return;
    this.authorIdToDelete = id;
    this.isConfirmModalVisible = true;
  }

  closeConfirmModal() {
    this.isConfirmModalVisible = false;
    this.authorIdToDelete = null;
  }

  applyFilter() {
    this.loadAuthors(0);
  }

  toggleSort(column: string) {
    if (this.currentSort === `${column},asc`) {
      this.currentSort = `${column},desc`;
    } else {
      this.currentSort = `${column},asc`;
    }
    this.loadAuthors(0);
  }

}