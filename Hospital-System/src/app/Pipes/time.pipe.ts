import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: false
})
export class TimePipe implements PipeTransform {

  transform(date: number | Date) {
  }
}
