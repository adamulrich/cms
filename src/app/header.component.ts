import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  ngOnInit(): void {
    
  }


  constructor() {

  }

  onSelected(selectedEvent : string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }

}
