import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  styleClass = "";
  constructor() { }

  ngOnInit(): void {
  }

  changeStyleClass(text:string){
    return "fixed-plugin ps " + text;
  }

}
