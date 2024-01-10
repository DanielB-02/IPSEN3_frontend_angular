import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Question} from "../../model/question/question";
import {QuestionService} from "../../services/question.service";
import {Platform} from "../../model/platform/platform";
import {PlatformService} from "../../services/platform.service";
import {Answer} from "../../model/answer/answer";
import {AnswerService} from "../../services/answer.service";
import { forkJoin } from 'rxjs';
import {map} from "rxjs";

@Component({
  selector: 'app-platform-detail',
  templateUrl: './platform-detail.component.html',
  styleUrls: ['./platform-detail.component.scss']
})
export class PlatformDetailComponent implements OnInit {
  platformId: string;
  questionId: string;
  platform: Platform;
  questions: Question[];
  answers: Answer[];

  constructor(private route: ActivatedRoute,
              private answerService: AnswerService,
              private questionService: QuestionService,
              private platformService: PlatformService) {
  }

  ngOnInit(): void {
    this.platformId = this.route.snapshot.paramMap.get('id');
    this.loadPlatform();
    this.loadQuestions();
  }

  onSubmitAlteredAnswer(answer: Answer): void{
    this.answerService.submitAlteredAnswer(answer)
      .subscribe();
  }

  private loadPlatform(): void {
    this.platformService.find(this.platformId)
      .subscribe(platform => this.platform = platform);
  }

  private loadQuestions(): void {
    this.questionService.getQuestionsForPlatform(this.platformId)
      .subscribe(questions => {
        this.questions = questions;

        // Load answers for each question
        const answerObservables = this.questions.map(question => this.loadAnswer(question.id));

        // Use forkJoin to wait for all answers to be loaded
        forkJoin(answerObservables).subscribe(answersArray => {
          // Assign answers to their respective questions
          this.questions.forEach((question, index) => {
            question.answers = answersArray[index];
          });
        });
      });
  }

  private loadAnswer(questionId: string) {
    return this.answerService.getAnswersOfQuestion(questionId).pipe(
      // Use map to extract the first answer from the array
      map(answers => answers.length > 0 ? [answers[0]] : [])
    );
  }
}
