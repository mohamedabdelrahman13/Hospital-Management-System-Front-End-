import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent , AlertModule } from 'ngx-bootstrap/alert';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loadingService/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  loading = false;

  constructor(
    private loadingService: LoadingService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.loadingService.loading$.subscribe(state => {
      this.loading = state;
      this.cd.detectChanges(); 
    });
  }


  title = 'Hospital-System';
}
