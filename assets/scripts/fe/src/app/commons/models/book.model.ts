import { User } from './user.model'
import { Author } from './author.model'

export class Books {

  id             : string = null;
  title          : string = null;
  plot           : string = null;
  type           : string = null;
  location       : string = null;
  status         : string = null;
  authors        : Author[] = [];
  owner          : User;
  date_created   : string = null;

  constructor(data={}) {
    Object.assign(this, data);
  }
}


