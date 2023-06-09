import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document = {
    id: "",
    name: "",
    description: "",
    url: "",
    children: []    
  };
  editMode: boolean = false;
  id: string;
  @ViewChild('f') documentForm: NgForm;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {

}
ngOnInit() {
  this.route.params.subscribe (
    (params: Params) => {
      this.id = params['id'];
      
      if  (this.id == null || this.id == undefined) {
        this.editMode = false;
        return
      }
      this.originalDocument = this.documentService.getDocument(this.id);
  
       if (this.originalDocument == undefined|| this.originalDocument == null) {
          return
       }
       this.editMode = true;
       this.document = {...this.originalDocument};
       console.log(this.document);
  }) 
}
  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      console.log(form.value);
      this.documentService.updateDocument(this.originalDocument, form.value)
    } else {
      this.documentService.addDocument(form.value)
    }

    this.onCancel()
  }

    // value = form.value // get values from form’s fields
    // newDocument = new Document()
    // Assign the values in the form fields to the
    // corresponding properties in the newDocument
    // if (editMode = true) then
    //  documentService.updateDocument(originalDocument, newDocument)
    // else
    //  documentService.addDocument(newDocument)
    // endIf
    // route back to the '/documents' URL 

}
