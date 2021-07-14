/* Model class for edit email.
 */
export class EditEmailModel {

    email: string = null;

    constructor (data={}) {
      Object.assign(this, data);
    }
};