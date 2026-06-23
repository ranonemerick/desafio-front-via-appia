import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Book } from '../../models/book.model';
import { BookService } from '../../services/book/book.service';
import { AuthorService } from '../../services/author/author.service';
import { NotificationService } from '../../services/notification/notification.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal';

@Component({
  selector: 'app-books',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ConfirmModalComponent
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  
  // ==========================================
  // 1. INJEÇÃO DE DEPENDÊNCIAS
  // ==========================================
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private notificationService = inject(NotificationService);

  // ==========================================
  // 2. PROPRIEDADES E ESTADOS
  // ==========================================
  
  // Dados Principais
  books: Book[] = [];
  authors: any[] = [];

  // Paginação
  currentPage = 0;
  totalPages = 0;

  // Filtros e Ordenação
  searchTerm: string = '';
  currentSort: string = 'title,asc';
  private searchSubject = new Subject<string>();

  // Estado do Formulário
  isFormVisible: boolean = false;
  editingBook: any = null;
  newBook: any = { title: '', gender: '', year: null, authorId: null };

  // Estado dos Modais
  isConfirmModalVisible = false;
  bookIdToDelete: string | null = null;

  // ==========================================
  // 3. CICLO DE VIDA (LIFECYCLE HOOKS)
  // ==========================================
  ngOnInit() {
    this.loadBooks(0);
    this.loadAuthors(0, 10);
    
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.searchTerm = searchText;
      this.loadBooks(0);
    });
  }

  // ==========================================
  // 4. MÉTODOS DE DADOS (HTTP CALLS)
  // ==========================================
  loadBooks(page: number) {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.bookService.getBooksByParams(this.searchTerm, '', null, '', page, 10, this.currentSort).subscribe((response: any) => {
        this.books = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
      });
    } else {
      this.bookService.getBooksByActive(page, 10, this.currentSort).subscribe((response: any) => {
        this.books = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
      });
    }
  }
  
  loadAuthors(page: number, size: number) {
    this.authorService.getAuthors(page, size).subscribe(response => {
      this.authors = response.content;
    });
  }

  // ==========================================
  // 5. MÉTODOS DE CRUD
  // ==========================================
  saveBook() {
    if (this.editingBook) {
      this.updateExistingBook();
    } else {
      this.createNewBook();
    }
  }

  createNewBook() {
    const selectedAuthor = this.authors.find(a => a.id == this.newBook.authorId);
    const bookToSave = {
      title: this.newBook.title,
      gender: this.newBook.gender,
      year: this.newBook.year,
      author: selectedAuthor
    }

    this.bookService.createBook(bookToSave).subscribe({
      next: () => {
        this.notificationService.show("Livro criado com sucesso! ", "success");
        this.loadBooks(0); 
        this.newBook = { title: '', gender: '', year: null, author: selectedAuthor } 
        this.isFormVisible = false;
      },
      error: (err) => {
        console.error("Erro ao salvar: ", err);
        this.notificationService.show("Erro ao salvar livro! ", "error");
      }
    });
  }

  updateBook(book: any) {
    this.editingBook = { ...book };

    const authorFound = this.authors.find(a => a.name === book.author);

    this.newBook = {
      ...book,
      authorId: authorFound ? authorFound.id : null
    };
    this.isFormVisible = true;
  }

  updateExistingBook() {
    const selectedAuthor = this.authors.find(a => a.id == this.newBook.authorId);
    const bookToUpdate = {
      ...this.newBook,
      author: selectedAuthor
    };
    this.bookService.updateBook(this.editingBook.id, bookToUpdate).subscribe(() => {
      this.notificationService.show("Livro atualizado com sucesso! ", "success");
      this.loadBooks(0);
      this.resetForm();
    })
  }

  deleteBook() {
    if (!this.bookIdToDelete) return;
      
    this.bookService.deleteBook(this.bookIdToDelete).subscribe({
      next: () => {
        this.notificationService.show("Livro excluído com sucesso! ", "success");
        this.loadBooks(this.currentPage);
        this.closeConfirmModal();
      },
      error: (err) => {
        this.notificationService.show("Não foi possível deletar o livro! ", 'error');
        this.closeConfirmModal();
      }
    });
  }

  // ==========================================
  // 6. MÉTODOS DE INTERFACE E EVENTOS (UI)
  // ==========================================
  onSearchType(text: string) {
    this.searchSubject.next(text);
  }

  toggleSort(column: string) { 
    if(this.currentSort === `${column},asc`) {
      this.currentSort = `${column},desc`
    } else {
      this.currentSort = `${column},asc`
    }
    this.loadBooks(0);
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  resetForm() {
    this.newBook = { title: '', gender: '', year: null, authorId: null };
    this.editingBook = null;
    this.isFormVisible = false;
  }

  openDeleteConfirmation(id: string | undefined) {
    if (!id) return;
    this.bookIdToDelete = id;
    this.isConfirmModalVisible = true;
  }

  closeConfirmModal() {
    this.isConfirmModalVisible = false;
    this.bookIdToDelete = null;
  }
}