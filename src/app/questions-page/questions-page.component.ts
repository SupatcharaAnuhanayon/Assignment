import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from './services/category.service';
import { CommonModule } from '@angular/common';
import { QuestionDetailPageComponent } from '../question-detail-page/question-detail-page.component';
import { SubmitAssignmentService } from './services/submit-assignment.service';
import { ScorePageComponent } from '../score-page/score-page.component';
import { TimerComponent } from "../timer/timer.component";

@Component({
    selector: 'app-questions-page',
    standalone: true,
    templateUrl: './questions-page.component.html',
    styleUrl: './questions-page.component.css',
    imports: [CommonModule, QuestionDetailPageComponent, TimerComponent]
})
export class QuestionsPageComponent {

  //  @Inject(ActivatedRoute)
  currentPage: number;
  timer:number;
  isTimeOut:boolean;
  categoryId: string;
  categoryName: string;
  questionListInfo: Array<{
    questionId: string;
    sequence: number;
    title: string;
    questionAnswerInfo: Array<{
      questionAnswerId: string;
      sequence: number;
      answer: string;
      selected: boolean;
    }>;
  }>;
  selectedQuestion: {
    questionId: string;
    sequence: number;
    title: string;
    questionAnswerInfo: Array<{
      questionAnswerId: string;
      sequence: number;
      answer: string;
      selected: boolean;
    }>;
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private submitAssignmentService: SubmitAssignmentService,
    private router: Router
  ) {
    this.currentPage = 0;
    this.timer = 0;
    this.isTimeOut = false;
    this.categoryId = activatedRoute.snapshot.params['categoryId'];
    this.categoryName = '';
    this.questionListInfo = [];
    this.selectedQuestion = {
      questionId: '',
      sequence: 0,
      title: '',
      questionAnswerInfo: [
        {
          questionAnswerId: '',
          sequence: 0,
          answer: '',
          selected: false,
        },
      ],
    };

    this.categoryService.getCategory(this.categoryId).subscribe((response) => {
      this.categoryName = response.data.title;
      this.questionListInfo = response.data.questionInfo;
      this.selectQuestion(this.questionListInfo[0]);
      this.timer= response.data.timeLimitOfMinuteUnit
    });
  }

  selectQuestion(questionInfo: {
    questionId: string;
    sequence: number;
    title: string;
    questionAnswerInfo: Array<{
      questionAnswerId: string;
      sequence: number;
      answer: string;
      selected: boolean;
    }>;
  }) {
    this.selectedQuestion = questionInfo;
    this.currentPage = questionInfo.sequence - 1;
  }

  questionInfoCallback(
    answer: {
      questionAnswerId: string;
      sequence: number;
      answer: string;
      selected: boolean;
    }[]
  ) {
    this.questionListInfo
      .filter((x) => x.questionId == this.selectedQuestion.questionId)
      .map((x) => (x.questionAnswerInfo = answer));
    console.log(' answer ', answer);
    console.log(' questionListInfo ', this.questionListInfo);
  }

  submit() {
    let answer: {
      questionCategoryId: string;
      questions: {
        questionId: string;
        answers: { questionAnswerId: string }[];
      }[];
    } = {
      questionCategoryId: this.categoryId,
      questions: [],
    };

    for (let item of this.questionListInfo) {
      let question: {
        questionId: string;
        answers: { questionAnswerId: string }[];
      } = {
        questionId: item.questionId,
        answers: [],
      };

      for (let answer of item.questionAnswerInfo) {
        if(answer.selected){
        question.answers.push({
          questionAnswerId: answer.questionAnswerId,
        });}
      }
      answer.questions.push(question);
    }
    console.log(answer)
    this.submitAssignmentService.getSubmit(answer).subscribe((response) => {
      console.log(response)
      this.submitAssignmentService.setScore(response.data.score)
      this.router.navigate(['scorePage'])
    });
  }

  timerCallback(isTimeOut: boolean) {
      this.isTimeOut = isTimeOut
  }
}
