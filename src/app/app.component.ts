import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cms';
  selectedFeature: string = '';

  ngOnInit(): void {
    
  }

  constructor() {}


  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature; 
  }

}
