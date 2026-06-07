import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book/book.service';
import { FormsModule } from '@angular/forms';
import { AuthorService } from '../../services/author/author.service';

@Component({
  selector: 'app-books',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);

  books: Book[] = [];

  currentPage = 0;
  totalPages = 0;

  isFormVisible: boolean = false;

  newBook: any = { title: '', gender: '', year: null, authorId: null };

  authors: any[] = [];

  editingBook: any = null;

  ngOnInit() {
    this.loadBooks(0);
    this.loadAuthors(0, 10);
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

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
        alert("Livro criado com sucesso!");
        this.loadBooks(0); //Recarrega a lista
        this.newBook = { title: '', gender: '', year: null, author: selectedAuthor } //Limpa o formulário
        this.isFormVisible = false;
      },
      error: (err) => console.error("Erro ao salvar: ", err)
    });
  }

  updateExistingBook() {
    const selectedAuthor = this.authors.find(a => a.id == this.newBook.authorId);
    const bookToUpdate = {
      ...this.newBook,
      author: selectedAuthor
    };
    this.bookService.updateBook(this.editingBook.id, bookToUpdate).subscribe(() => {
      alert("Livro atualizado");
      this.loadBooks(0);
      this.resetForm();
    })
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

  loadBooks(page: number) {
    this.bookService.getBooksByActive(page, 10).subscribe(response => {
      this.books = response.content;
      this.currentPage = response.number;
      this.totalPages = response.totalPages;
    });
  }

  loadAuthors(page: number, size: number) {
    this.authorService.getAuthors(page, size).subscribe(response => {
      this.authors = response.content;
    });
  }

  resetForm() {
    this.newBook = { title: '', gender: '', year: null, authorId: null };
    this.editingBook = null;
    this.isFormVisible = false;
  }

}