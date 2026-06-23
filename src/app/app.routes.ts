import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BooksComponent } from './components/books/books.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthorComponent } from './components/author/author.component';
import { UserComponent } from './components/user/user.component'; 

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'book', component: BooksComponent},
    {path: 'author', component: AuthorComponent},
    {path: 'user', component: UserComponent}
];
