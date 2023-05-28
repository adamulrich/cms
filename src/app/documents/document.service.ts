import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService implements OnInit{
  documentChangedEvent = new EventEmitter<Document[]>();
  documents: Document[] = [];
  
  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

  ngOnInit(): void {
    
  }

  getDocuments() {
    return this.documents;
  }

  getDocument(id: string) {
    return this.documents.find(document => document.id == id);
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
 }

}
