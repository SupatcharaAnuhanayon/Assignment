import { Component } from '@angular/core';
import { SubmitAssignmentService } from '../questions-page/services/submit-assignment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css',
})
export class ScorePageComponent {
  score: number;

  constructor(private submitAssignmentService: SubmitAssignmentService, 
    private router: Router) {
    this.score = 0;
    this.submitAssignmentService.score$.subscribe((response) => {
      this.score = response;
    });
  }
  ok() {
    this.router.navigate(['']);
  }
}
