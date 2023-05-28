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
    documents: Document[] = [];
    id: string = "";


    ngOnInit(): void {
        this.documents = this.documentService.getDocuments();
        this.documentService.documentChangedEvent.subscribe(
            (documents: Document[]) => {
            this.documents = documents
            }  
        )
    }

    constructor(private documentService: DocumentService) {

    }

}
