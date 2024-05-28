import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-question-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-detail-page.component.html',
  styleUrl: './question-detail-page.component.css'
})
export class QuestionDetailPageComponent {
   @Input() questionInfo: {
    questionId:string
    sequence : number,
        title: string,
        questionAnswerInfo:Array<{
          questionAnswerId: string,
          sequence: number,
          answer: string,
          selected: boolean
        }>
   } | undefined

   @Output() questionInfoCallback: EventEmitter<Array<{
    questionAnswerId: string,
    sequence: number,
    answer: string,
    selected: boolean
  }>>

   constructor(){
    this.questionInfoCallback = new EventEmitter<Array<{
      questionAnswerId: string,
      sequence: number,
      answer: string,
      selected: boolean
    }>>()
    this.questionInfo = {
      questionId:"",
      sequence : 0,
          title: "",
          questionAnswerInfo:[]
   }
  }

  onChange(selected: { questionAnswerId: string; sequence: number; answer: string; }) {
       this.questionInfo?.questionAnswerInfo.filter(x => x.questionAnswerId == selected.questionAnswerId).map(x => x.selected = !x.selected)
   
   this.questionInfoCallback.emit(this.questionInfo?.questionAnswerInfo)
   console.log( this.questionInfoCallback)
    }
}
