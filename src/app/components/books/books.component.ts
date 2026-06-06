import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books',
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  private bookService = inject(BookService)
  books: Book[] = [];

  currentPage = 0;
  totalPages = 0;

  ngOnInit() {
    this.loadBooks(0);
  }

  loadBooks(page: number) {
    this.bookService.getBooks(page).subscribe(response => {
      this.books = response.content;
      this.currentPage = response.number;
      this.totalPages = response.totalPages;
    });
  }
}