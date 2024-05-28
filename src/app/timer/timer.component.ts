import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  @Input() minutes: number;
  minutesInterval: any;
  second: number;
  isTimeOut: boolean;
  @Output() timerCallback: EventEmitter<boolean>
  constructor() {
    this.minutes = 0;
    this.second = 0;
    this.isTimeOut =false;
    this.timerCallback = new EventEmitter<boolean>()
    this.minutesInterval = setInterval(() => {
      if (this.second > 0) {
        this.second--;
      } else {
        if (this.minutes > 0) {
          this.minutes--;
          this.second = 59;
        } else {
          clearInterval(this.minutesInterval);
          this.isTimeOut = true;

          this.timerCallback.emit(this.isTimeOut)
        }
      }
    }, 1000);
  }
}
