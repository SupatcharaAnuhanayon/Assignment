import { Component } from '@angular/core';
import { QuestionListModel } from '../shared/Models/question-list-model';
import { CommonModule } from '@angular/common';
import { QuestionService } from './services/question.service';
import { SessionStorageService } from '../shared/session-storage.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-question-list-page',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './question-list-page.component.html',
  styleUrl: './question-list-page.component.css',
})
export class QuestionListPageComponent {
  questionList: QuestionListModel[] = [];
  constructor(private questionService: QuestionService ,private storage: SessionStorageService) {

    this.questionService.getQuestionList().subscribe((response) => {
    
      for(var item of response.data)
      {
        this.questionList.push(item)
      }
    });
  }
}
