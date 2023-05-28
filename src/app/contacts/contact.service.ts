import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

   constructor() {
      this.contacts = MOCKCONTACTS;
   }
  
  getContacts(): Contact[] {
    return this.contacts.sort(this.sort_function).slice()
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id == id);
  
   }

  sort_function(x,y) {
    if (x.name.split(" ").pop() > y.name.split(" ").pop()) {
      return 1;
    }
    if (x.name < y.name) {
      return -1;
    }
    return 0;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }
   this.contacts.splice(pos, 1);
   this.contactChangedEvent.emit(this.contacts.slice());
   }

  
}
