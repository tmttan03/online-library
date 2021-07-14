
export class SearchModel {

    search_text: string = null;

    constructor (data={}) {
      Object.assign(this, data);
    }
};