import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent , AlertModule } from 'ngx-bootstrap/alert';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  public isShown:boolean;
  constructor() {
    this.isShown = false;
  }


  title = 'Hospital-System';
}
