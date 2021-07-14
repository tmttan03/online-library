import { USER_STATES } from "src/app/components/users/users.states";
import { PUBLIC_STATES } from "src/app/components/public/public.states";
import { BOOK_STATES } from "src/app/components/books/books.states";


export const APP_STATES = {
    otherwise : '/login/',
    states    : [].concat(
      USER_STATES,
      PUBLIC_STATES,
      BOOK_STATES,
    )
}
