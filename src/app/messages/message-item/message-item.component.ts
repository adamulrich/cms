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
      this.messageSender = this.message.sender["name"];

  }

}


