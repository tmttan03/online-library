import { urlsafe } from '../utils/http.utils';

/* USERS ENDPOINTS
 */
export const USERS = '/api/users/';

/* AUTH ENDPOINTS
 */
export const AUTH_USER = urlsafe(USERS, 'auth');
export const AUTH_USER_ID = USERS;
export const CHANGE_EMAIL = urlsafe(USERS, 'email');
export const AUTH_LOGIN = urlsafe(USERS, 'login');
export const AUTH_REGISTER = urlsafe(USERS, 'register');
export const NEW_USER = urlsafe(USERS, 'new-user');

/* BOOKS ENDPOINTS */
export const BOOKS = '/api/books/';
export const OWNED_BOOKS = urlsafe(BOOKS, 'owned-books');
export const ADD_BOOK = urlsafe(BOOKS, 'add-book');
export const UPDATE_BOOK = urlsafe(BOOKS, 'update-book');
export const CHECKOUT_BOOK = urlsafe(BOOKS, 'checkout-book');
export const IS_CHECKED_OUT = urlsafe(BOOKS, 'is-checked-out');
export const RETURN_BOOK = urlsafe(BOOKS, 'return-book');
export const BORROWED_BOOKS = urlsafe(BOOKS, 'borrowed-books');

/** COMMENTS ENDPOINTS */
export const COMMENTS = urlsafe(BOOKS, 'comments');
export const ADD_COMMENT = urlsafe(BOOKS, 'add-comment');
export const DELETE_COMMENT = urlsafe(BOOKS, 'delete-comment');
