import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
    selector: 'cms-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{
    @Output() selectedDocumentEvent  = new EventEmitter<Document>();
    documents: Document[] = []

    ngOnInit(): void {
        this.documents = this.documentService.getDocuments();
    }

    constructor(private documentService: DocumentService) {

    }

    onSelected(document: Document) {
        this.selectedDocumentEvent .emit(document);
      }
}
