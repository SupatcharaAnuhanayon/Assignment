import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { QuestionListPageComponent } from './question-list-page/question-list-page.component';
import { QuestionsPageComponent } from './questions-page/questions-page.component';
import { ScorePageComponent } from './score-page/score-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path:'',
    component:QuestionListPageComponent
  },
  {
    path:'questionsPage/:categoryId',
    component:QuestionsPageComponent
  }
  ,
  {
    path:'scorePage',
    component:ScorePageComponent
  }
];

