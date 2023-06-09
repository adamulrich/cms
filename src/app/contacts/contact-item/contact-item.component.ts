import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Output() contactSelected = new EventEmitter<void>();

  constructor() { }

  onSelected() {
    this.contactSelected.emit();
  }
  ngOnInit(): void {

  }
}


// The ContactService also needs to be updated with functions to add, update 
// and delete contacts from the contacts list in the ContactService. 

// The addContact() 
// function and updateContact() will be called by the ContactEditComponent when the user 
// selects the Save button. 

