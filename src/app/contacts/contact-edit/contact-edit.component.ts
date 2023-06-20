import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnDestroy {
  originalContact: Contact;
  contact: Contact = {
    id: "",
    name: "",
    email: "",
    phone: "",
    imageUrl: "",
    group: []
  };
  editMode: boolean = false;
  id: string;
  groupContacts: Contact[] = [];

  @ViewChild('f') documentForm: NgForm;
  
  constructor(
      private contactService: ContactService,
      private router: Router,
      private route: ActivatedRoute
  ) {
    contactService.getContacts();
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  ngOnInit(): void {
    this.route.params.subscribe (
      (params: Params) => {
        this.id = params['id'];
        
        if  (this.id == null || this.id == undefined) {
          this.editMode = false;
          return
        }
        this.originalContact = this.contactService.getContact(this.id);
    
        if (this.originalContact == undefined|| this.originalContact == null) {
          return
        }
        this.editMode = true;
        this.contact = {...this.originalContact};
        console.log(this.contact);

        console.log(this.contact.group);

        if (this.contact.group != null) {
          this.groupContacts = [...this.contact.group];
          console.log(this.groupContacts);
        }
      }
    )
  } 
  

  onSubmit(form: NgForm) {

    const value = form.value;
    const newContact = new Contact(
      '',
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );

    if (this.editMode) {

      this.contactService.updateContact(this.originalContact, newContact)
    } else {
      this.contactService.addContact(newContact)
    }

    this.onCancel()
  }
  
  ngOnDestroy(): void {}

  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
       return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
       if (newContact.id === this.groupContacts[i].id) {
         return true;
      }
    }
    return false;
 }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
      console.log('invalid')
      return;
    }
    console.log('pushing' + selectedContact.toString())
    this.groupContacts.push(selectedContact);
 }

 onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
     return;
  }
  this.groupContacts.splice(index, 1);
}

}
