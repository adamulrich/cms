import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = 
  [
    new Message("1","Test Subject 1", "Test Message 1", "Test User 1"),
    new Message("2","Test Subject 2", "Test Message 2", "Test User 2"),
    new Message("3","Test Subject 3", "Test Message 3", "Test User 3"),
  ]

  constructor() {}

  ngOnInit(): void {
    
  }

  onAddMessage(message: Message) {
    this.messages.push(message);

  }
}
