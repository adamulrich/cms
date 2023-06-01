import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  @Output() selectedContactEvent = new EventEmitter<Contact>();  
  contacts: Contact[] = [];
  id: string = "";
  private subscription: Subscription;
  constructor(private contactService: ContactService) {
      
    }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactsListChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    )
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onSelected(contact: Contact) {
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }

}
