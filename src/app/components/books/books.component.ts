import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';

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
  private bookService = inject(BookService)
  books: Book[] = [];

  currentPage = 0;
  totalPages = 0;

  isFormVisible: boolean = false;

  newBook: any = { title: '', gender: '', year: null, author: '' };

  toggleForm() {
    this.isFormVisible= !this.isFormVisible;
  }

  saveBook() {
    this.bookService.createBook(this.newBook).subscribe({
      next: () => {
        alert("Livro criado com sucesso!");
        this.loadBooks(0); //Recarrega a lista
        this.newBook = {title: '', gender: '', year: null, author: ''} //Limpa o formulário
      },
      error: (err) => console.error("Erro ao salvar: ", err)
    });
  }

  ngOnInit() {
    this.loadBooks(0);
  }

  loadBooks(page: number) {
    this.bookService.getBooksByActive(page).subscribe(response => {
      this.books = response.content;
      this.currentPage = response.number;
      this.totalPages = response.totalPages;
    });
  }
}