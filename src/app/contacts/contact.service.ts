import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  maxContactId: number = 0;
  contactsListChangedEvent = new Subject<Contact[]>();

   constructor() {
      this.contacts = MOCKCONTACTS;
      this.maxContactId = this.getMaxId();
      console.log(this.maxContactId);
   }
  
  
  
   getContacts(): Contact[] {
    return this.contacts; //.sort(this.sort_function).slice()
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
    this.contactsListChangedEvent.next(this.contacts.slice());
  }

  updateContact(originalDoc: Contact, newDoc: Contact) {
    if (!newDoc && !originalDoc) {
      return
    }

    const position = this.contacts.indexOf(originalDoc);
    if (position < 0) {
      return
    }

    newDoc.id = originalDoc.id;
    this.contacts[position] = newDoc

    var contactsListClone = this.contacts.slice();
    this.contactsListChangedEvent.next(contactsListClone)

  }
  

  addcontact(newcontact: Contact) {
    if (!newcontact) {
      return
    }

    this.maxContactId ++;

    newcontact.id = this.maxContactId.toString();
    this.contacts.push(newcontact);

    var contactsListClone = this.contacts.slice();
    this.contactsListChangedEvent.next(contactsListClone)

  }

  getMaxId(): number  {
  
    return Math.max(...this.contacts.map(d => +d.id),0)
  }
  
}
