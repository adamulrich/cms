import { Injectable } from '@angular/core';
import { Message } from './message.model';

import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number = 0;

  urlExpress: string = "http://localhost:3000/messages";

  constructor(
    private httpClient: HttpClient) { }

  getMessages(): any {
    this.httpClient.get<{message: String, messages: Message[]}>(this.urlExpress).subscribe(

      // success method

      (responseData) => {
        this.messages = responseData.messages;
        // console.log(this.messages);
        this.maxMessageId = this.getMaxId();
        // sort the list of messages
        this.sortAndSend();
      },
      // error method
      (error: any) => {
        // print the error to the console
        console.log(error);
      }
    )
  }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id == id);
  }


  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(d => d.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Message to the id of the old Message
    newMessage.id = originalMessage.id;
    // not needed. put leaves data alone if not included.
    // newMessage._id = originalMessage._id;
    

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.httpClient.put(this.urlExpress +'/' + originalMessage.id,
      newMessage, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.messages[pos] = newMessage;
          this.sortAndSend();
        }
      );
  }


  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // make sure id of the new Message is empty
    message.sender = "101";

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.httpClient.post<{ msg: string, message: Message }>(this.urlExpress,
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          this.messages.push(responseData.message);
          this.sortAndSend();
        }
      );
  }
  getMaxId(): number {
    return Math.max(...this.messages.map(d => +d.id), 0)
  }


  deleteMessage(message: Message) {

    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(d => d.id === message.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient.delete(this.urlExpress +'/' + message.id)
      .subscribe(
        (response: Response) => {
          this.messages.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    var messagesListClone = this.messages.slice();
    // emit the next contact list change event
    this.messageListChangedEvent.next(messagesListClone)
    return messagesListClone
  }
}

