import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';

import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService{

  contacts: Contact[] = [];
  maxContactId: number = 0;
  contactsListChangedEvent = new Subject<Contact[]>();
  urlFirebase: string = "https://cms-wdd430-b1c6c-default-rtdb.firebaseio.com/contacts.json";

  constructor(
    private httpClient: HttpClient) {
    
    }  
  
  // compareName(a: Contact, b: Contact) {
  //   if
  //    (a.email > b.email) {
  //     return 1
  //   } else {
  //     return -1
  //   }
  // }
  
  getContacts(): any {
    this.httpClient.get<Contact[]>(this.urlFirebase).subscribe(
      
      // success method
      (contacts: Contact[] ) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        // sort the list of contacts
        // this.contacts.sort(this.compareName);
        var contactsListClone = this.contacts.slice();
        // emit the next contact list change event
        this.contactsListChangedEvent.next(contactsListClone)
        return contactsListClone
      },
      // error method
      (error: any) => {
        // print the error to the console
        console.log(error);
      } 
    )
  }

    getContact(id: string): Contact {
    if (!this.contacts) {
      this.contacts = this.getContacts();
      return this.contacts.find(contact => contact.id == id);
    } else {
      return this.contacts.find(contact => contact.id == id);
    }
  
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
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!newContact && !originalContact) {
      return
    }

    const position = this.contacts.indexOf(originalContact);
    if (position < 0) {
      return
    }
    
    newContact.id = originalContact.id;
    this.contacts[position] = newContact

    this.storeContacts();
  }
  

  addContact(newcontact: Contact) {
    if (!newcontact) {
      return
    }

    this.maxContactId ++;

    newcontact.id = this.maxContactId.toString();
    this.contacts.push(newcontact);

    this.storeContacts();
  }

  getMaxId(): number  {
  
    return Math.max(...this.contacts.map(d => +d.id),0)
  }


  storeContacts() {
    const serializedData: string = JSON.stringify(this.contacts);
    const httpHeaders: HttpHeaders = new HttpHeaders()
      .set('content-type', "application/json")
      .set('Access-Control-Allow-Origin', '*');

    this.httpClient.put(this.urlFirebase,serializedData,{
      headers: httpHeaders}).subscribe( response =>
        {
          this.contactsListChangedEvent.next(this.contacts.slice())     
        });
  }
}
