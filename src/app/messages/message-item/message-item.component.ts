import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit{

  @Input() message: Message;
  messageSender: string;
  private subscription: Subscription;
  
  constructor(private contactService: ContactService) { }
  
  async ngOnInit() {
    // console.log(this.message.sender);

    //this.contactService.getContacts();
    this.subscription = this.contactService.contactsListChangedEvent.subscribe(
      (contactsList: Contact[]) => {
      
      });
  
    const contact = this.contactService.getContact(this.message.sender);
    // console.log("contact:" + contact)
    if (contact) {
      this.messageSender = contact.name;
    } else {
      this.messageSender = "";
      // we don't have the name yet. Need to implement something async.
    }
  }

}


