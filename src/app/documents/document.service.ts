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
  maxDocumentId: number = 0;

  urlExpress: string = "http://localhost:3000/documents";

  constructor(
    private httpClient: HttpClient) { }

  getDocuments(): any {
    this.httpClient.get<{message: String, documents: Document[]}>(this.urlExpress).subscribe(

      // success method

      (responseData) => {
        this.documents = responseData.documents;
        console.log(this.documents);
        this.maxDocumentId = this.getMaxId();
        // sort the list of documents
        this.sortAndSend();
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


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // not needed. put leaves data alone if not included.
    // newDocument._id = originalDocument._id;
    

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.httpClient.put(this.urlExpress +'/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }


  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.httpClient.post<{ message: string, document: Document }>(this.urlExpress,
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }
  getMaxId(): number {
    return Math.max(...this.documents.map(d => +d.id), 0)
  }


  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient.delete(this.urlExpress +'/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    var documentsListClone = this.documents.slice();
    documentsListClone.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
    // emit the next contact list change event
    this.documentListChangedEvent.next(documentsListClone)
    return documentsListClone
  }
}

