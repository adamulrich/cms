import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number= 0;
  
  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
    console.log(this.maxDocumentId);
   }

  
  getDocuments(): Document[] {
    return this.documents;
  }

  getDocument(id: string): Document {
    return this.documents.find(document => document.id == id);
  }

  
  updateDocument(originalDoc: Document, newDoc: Document) {
    if (!newDoc && !originalDoc) {
      return
    }

    const position = this.documents.indexOf(originalDoc);
    if (position < 0) {
      return
    }

    newDoc.id = originalDoc.id;
    this.documents[position] = newDoc

    var documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone)

  }
  

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return
    }

    this.maxDocumentId ++;

    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    var documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone)

  }

  getMaxId(): number  {
  
    return Math.max(...this.documents.map(d => +d.id),0)
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
    this.documentListChangedEvent.next(this.documents.slice())
  }
}