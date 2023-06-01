import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})

export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;



  constructor(private contactService: ContactService, 
            private activatedRoute:  ActivatedRoute,
            private router: Router) {}




  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id)
      }
    )
    
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }

}
