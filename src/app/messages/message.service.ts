import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number= 0;
  urlFirebase: string = "https://cms-wdd430-b1c6c-default-rtdb.firebaseio.com/messages.json";

  constructor(
    private httpClient: HttpClient, 
    private contactService: ContactService) {
  
    }  
 
   getMessages(): any {
    this.httpClient.get<Message[]>(this.urlFirebase).subscribe(
      
      // success method
      (messages: Message[] ) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();

        var messageListClone = this.messages.slice();
        // emit the next document list change event
        this.messageChangedEvent.next(messageListClone);
        return messageListClone;
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

  addMessage(message: Message) {
    message.sender = "19";
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number  {
    return Math.max(...this.messages.map(d => +d.id),0)
  }

  storeMessages() {
    const serializedData: string = JSON.stringify(this.messages);
    const httpHeaders: HttpHeaders = new HttpHeaders()
      .set('content-type', "application/json")
      .set('Access-Control-Allow-Origin', '*');

    this.httpClient.put(this.urlFirebase,serializedData,{
      headers: httpHeaders}).subscribe( response =>
        {
          this.messageChangedEvent.next(this.messages.slice())     
        });
  }
}
