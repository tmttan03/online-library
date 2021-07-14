/* Model class for User */
export class User {
    id            : string = null;
    email         : string = null;
    username      : string = null;
    first_name    : string = null;
    last_name     : string = null;
    full_name     : string = null;
    has_usable_pass : boolean = null;
    icon         : any = null;
    date_joined  : string = null;
    date_updated : string = null;
    permission   : string = null;
    live_count   : number = null;
    backtest_count: number = null;
    // avatar: string = null;

    constructor(data={}) {
      Object.assign(this, data);
    }
}


export class ShortUser {
    id          : string = null;
    email       : string = null; 
    username    : string = null;
    first_name  : string = null;
    full_name   : string = null;
    last_name   : string = null;
    avatar       : string = null;
}