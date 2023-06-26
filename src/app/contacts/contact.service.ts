import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  contactsListChangedEvent = new Subject<Contact[]>();
  maxContactId: number = 0;

  urlExpress: string = "http://localhost:3000/contacts";

  constructor(
    private httpClient: HttpClient) { }

  

  getContacts(): any {
    this.httpClient.get<{message: String, contacts: Contact[]}>(this.urlExpress).subscribe(

      // success method

      (responseData) => {
        this.contacts = responseData.contacts;
        console.log(this.contacts);
        this.maxContactId = this.getMaxId();
        // sort the list of contacts
        this.sortAndSend();
      },
      // error method
      (error: any) => {
        // print the error to the console
        console.log(error);
      }
    )
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id == id);
  }


  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    console.log(pos);
    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    // not needed. put leaves data alone if not included.
    // newContact._id = originalContact._id;
    

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.httpClient.put(this.urlExpress +'/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }


  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Contact is empty
    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.httpClient.post<{ message: string, contact: Contact }>(this.urlExpress,
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );
  }
  getMaxId(): number {
    return Math.max(...this.contacts.map(d => +d.id), 0)
  }


  deleteContact(contact: Contact) {

    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient.delete(this.urlExpress +'/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    var contactsListClone = this.contacts.slice();
    contactsListClone.sort((a, b) => (a.email < b.email) ? 1 : (a.email > b.email) ? -1 : 0);
    // emit the next contact list change event
    this.contactsListChangedEvent.next(contactsListClone)
    return contactsListClone
  }
}

