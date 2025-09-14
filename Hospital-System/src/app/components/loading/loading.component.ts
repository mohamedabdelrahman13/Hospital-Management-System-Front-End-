import { Component } from '@angular/core';
import { LoadingService } from '../../services/loadingService/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: false,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  public loading$!:Observable<boolean>;
  constructor(private loadingService:LoadingService){

    this.loading$ = this.loadingService.loading$

  }
  
}
