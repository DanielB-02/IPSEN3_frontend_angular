import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Platform} from "../../model/platform/platform";
import {PlatformService} from "../../services/platform.service";
import {FormGroup} from "@angular/forms";
import * as stringSimilarity from 'string-similarity';
import {QuestionService} from "../../services/question.service";
import {Question} from "../../model/question/question";
import {AnswerService} from "../../services/answer.service";
import {Answer} from "../../model/answer/answer";

@Component({
  selector: 'app-platform-form',
  templateUrl: './platform-form.component.html',
  styleUrls: ['./platform-form.component.scss']
})
export class PlatformFormComponent {

  platform: Platform;
  platforms: Platform[];
  errorShown: boolean =false;
  private question: Question;
  private answer: Answer;
  firstResult;

  constructor(
      private questionService: QuestionService,
      private route: ActivatedRoute,
      private router: Router,
      private platformService: PlatformService,
      private answerService: AnswerService){
        this.question = new Question(),
        this.platform = new Platform(),
        this.answer = new Answer()}

  ngOnInit() {
    this.platformService.findAll().subscribe(
      data => {
        this.platforms = data;
      });
  }
  onSubmit() {
    if(this.checkName(this.platform.platformName)) {

      this.platformService.save(this.platform).subscribe(result => this.gotoPlatformList(result));

    }
  }


  checkName(platformName:string){
    for(var existingPlatform of this.platforms){
      if(existingPlatform.platformName == platformName ||
        this.isAlikeWithMisspelling(existingPlatform.platformName, platformName, 0.5)){
        this.errorShown = true;
        setTimeout(() => {
          this.errorShown = false;
        }, 7000);
        return false

      }
    }
  return true
  }

  isAlikeWithMisspelling(str1: string, str2: string, tolerance: number): boolean {
    const similarity = stringSimilarity.compareTwoStrings(str1, str2);
    return similarity >= (1 - tolerance);
  }

  createEmptyAnswer(question: Question){
    this.answer.question = question;
    this.answer.textAnswer = "";
    this.answerService.submitNewAnswer(this.answer).subscribe();
  }

  setBasicQuestions(platform:Platform){

    this.questionService.getQuestionsForPlatform(this.platforms[0].id)
      .subscribe((questions: Question[]) => {

      for (const otherPlatformQuestion of questions) {

        this.question.platformId = platform.id;
        this.question.textQuestion = otherPlatformQuestion.textQuestion;

        this.questionService.createQuestion(this.question)
          .subscribe(result => this.createEmptyAnswer(result));
      }
    })
  }





  gotoPlatformList(platform: Platform) {
    this.setBasicQuestions(platform)
    this.router.navigateByUrl('main-view/platforms');
  }
}
