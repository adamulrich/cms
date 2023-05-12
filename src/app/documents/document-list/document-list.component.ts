import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
    selector: 'cms-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{
    @Output() selectedDocumentEvent  = new EventEmitter<Document>();
    
    ngOnInit(): void {
        
    }

    documents: Document[] = [
        new Document("a","aa","aaa","aaaa",null),
        new Document("b","bb","bbb", "bbbb",null),
        new Document("c","cc","ccc", "cccc",null),
        new Document("d","dd","ddd","dddd",null),
        new Document("e","ee","eee","eeee",null)
    ]

    onSelected(document: Document) {
        this.selectedDocumentEvent .emit(document);
      }
}
