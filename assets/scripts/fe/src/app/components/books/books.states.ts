import { NavContent } from "src/app/commons/utils/layout.utils";
import { LoginRequired } from "src/app/commons/utils/security.utils";
import { AddBookComponent } from "./add-book/add-book.component";
import { AuthorsComponent } from "./authors/authors.component";
import { BorrowedBooksComponent } from "./borrowed-books/borrowed-books.component";
import { OwnedBooksComponent } from "./owned-books/owned-books.component";

export const BOOK_STATES: Object[] = [
    {
        name : 'authors',
        url  : '/authors/',
        views:  NavContent(AuthorsComponent),
        onEnter: LoginRequired
    },
    {
        name : 'categories',
        url  : '/categories/',
        views:  NavContent(AuthorsComponent),
        onEnter: LoginRequired
    },
    {
        name : 'add-book',
        url  : '/add-book/',
        views:  NavContent(AddBookComponent),
        onEnter: LoginRequired
    },
    {
        name : 'borrowed-books',
        url  : '/borrowed-books/',
        views:  NavContent(BorrowedBooksComponent),
        onEnter: LoginRequired
    },
    {
        name : 'owned-books',
        url  : '/owned-books/',
        views:  NavContent(OwnedBooksComponent),
        onEnter: LoginRequired
    },
]
