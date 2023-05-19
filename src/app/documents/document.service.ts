import { Injectable, OnInit } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService implements OnInit{

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

}
