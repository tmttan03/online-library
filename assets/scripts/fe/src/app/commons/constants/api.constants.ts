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
export const OWNED_BOOK = urlsafe(BOOKS, 'owned');
export const BORROWED_BOOKS = urlsafe(BOOKS, 'borrowed')

export const RETURN_BOOK = urlsafe(BOOKS, 'return')
export const ADD_BOOK = urlsafe(BOOKS, 'add');
export const UPDATE_BOOK = urlsafe(BOOKS, 'update');
export const CHECKOUT_BOOK = urlsafe(BOOKS, 'checkout');

export const AUTHORS = urlsafe(BOOKS, 'authors');
export const COMMENTS = urlsafe(BOOKS, 'comments');
export const DELETE_COMMENT = urlsafe(BOOKS, 'delete-comment');
export const ADD_COMMENT = urlsafe(BOOKS, 'add-comment');
export const IS_CHECKED_OUT = urlsafe(BOOKS, 'is-checked-out');