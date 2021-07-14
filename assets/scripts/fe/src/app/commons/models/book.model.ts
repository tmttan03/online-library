// export class DeleteCard {

//     customer_token : string = null;
//     card_token: string = null;

//     constructor(data={}) {
//       Object.assign(this, data);
//     }
//   }

export class Books {

    title : string = null;
    author: string = null;
    location : string = null;
    is_digital_copy : boolean = null;
    owner: Number = null;
    status : string = null;

    constructor(data={}) {
      Object.assign(this, data);
    }
}