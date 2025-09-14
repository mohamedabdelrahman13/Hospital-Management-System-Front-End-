import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: false
})
export class TimePipe implements PipeTransform {

  transform(date: number | Date) {


    // let milliseconds: number;

    // if (value instanceof Date) {
    //   milliseconds = value.getTime();
    // } else {
    //   milliseconds = value;
    // }

    // // Ensure the value is a non-negative number
    // if (isNaN(milliseconds) || milliseconds < 0) {
    //   return '00:00:00'; 
    // }

    // // Calculate hours, minutes, and seconds from milliseconds
    // let totalSeconds = Math.floor(milliseconds / 1000);
    // const hours = Math.floor(totalSeconds / 3600);
    // totalSeconds %= 3600;
    // const minutes = Math.floor(totalSeconds / 60);
    // const seconds = totalSeconds % 60;

    // // Pad with leading zeros if necessary
    // const pad = (num: number): string => num.toString().padStart(2, '0');

    // return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
}
