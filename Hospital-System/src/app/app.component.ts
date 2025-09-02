import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  public time!:any
  public date:Date = {} as Date
  constructor() {
  }
  title = 'Hospital-System';
}
