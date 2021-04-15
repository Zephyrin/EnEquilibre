import { Mediaobject } from './mediaobject';
export class Contact {
  id: number;
  background: Mediaobject;
  separator: Mediaobject;
  translations: any;
  contact: any;
  comment: any;
  phone: string;
  email: string;

  public constructor(contact: Contact = null) {
    if (contact && contact !== null) {
      this.id = contact.id;
      if (contact.background) {
        this.background = new Mediaobject(contact.background);
      }
      if (contact.separator) {
        this.separator = new Mediaobject(contact.separator);
      }

      this.translations = contact.translations;
      this.contact = contact.contact;
      this.comment = contact.comment;
      this.email = contact.email;
      this.phone = contact.phone;
    }
  }

  public static create() { return new Contact(); }
  public static createCpy(contact: Contact) { return new Contact(contact); }

  toJSON() {
    const data = {};
    if (this.background) { data[`background`] = this.background.id; }
    if (this.background === null) { data[`background`] = null; }
    if (this.separator) { data[`separator`] = this.separator.id; }
    if (this.separator === null) { data[`separator`] = null; }
    if (this.contact) { data[`contact`] = this.contact; }
    if (this.contact === null) { data[`contact`] = null; }
    if (this.comment) { data[`comment`] = this.comment; }
    if (this.comment === null) { data[`comment`] = null; }
    if (this.email) { data[`email`] = this.email; }
    if (this.email === null) { data[`email`] = null; }
    if (this.phone) { data[`phone`] = this.phone; }
    if (this.phone === null) { data[`phone`] = null; }
    return data;
  }
}
