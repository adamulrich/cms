import { Injectable } from '@angular/core';
import { Document } from './document.model';

import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number= 0;
  urlFirebase: string = "https://cms-wdd430-b1c6c-default-rtdb.firebaseio.com/documents.json";

  constructor(
    private httpClient: HttpClient) {}  
  
  compareName(a: Document, b: Document) {
    if (a.name < b.name) {
      return 1
    } else {
      return -1
    }
  }


  getDocuments(): any {
    this.httpClient.get<Document[]>(this.urlFirebase).subscribe(
      
      // success method
      (documents: Document[] ) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        // sort the list of documents
        this.documents.sort(this.compareName);
        var documentsListClone = this.documents.slice();
        // emit the next document list change event
        this.documentListChangedEvent.next(documentsListClone);
        return documentsListClone;
      },
      // error method
      (error: any) => {
        // print the error to the console
        console.log(error);
      } 
    )
  }

  getDocument(id: string): Document {
    return this.documents.find(document => document.id == id);
  }

  
  updateDocument(originalDoc: Document, newDoc: Document) {
    if (!newDoc && !originalDoc) {
      // console.log(newDoc);
      // console.log(originalDoc);
      return
    }

    const position = this.documents.indexOf(originalDoc);
    if (position < 0) {
      return
    }

    newDoc.id = originalDoc.id;
    this.documents[position] = newDoc

    this.storeDocuments();
    // var documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone)

  }
  

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return
    }

    console.log('here');
    this.maxDocumentId ++;

    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    // var documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone)
    this.storeDocuments();
    
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

    this.storeDocuments();
    // this.documentListChangedEvent.next(this.documents.slice())
  }


  storeDocuments() {
    const serializedData: string = JSON.stringify(this.documents);
    const httpHeaders: HttpHeaders = new HttpHeaders()
      .set('content-type', "application/json")
      .set('Access-Control-Allow-Origin', '*');

    this.httpClient.put(this.urlFirebase,serializedData,{
      headers: httpHeaders}).subscribe( response =>
        {
          this.documentListChangedEvent.next(this.documents.slice())     
        });
  }
}
