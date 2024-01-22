import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {QuestionService} from "../../services/question.service";
import {PlatformService} from "../../services/platform.service";
import {Platform} from "../../model/platform/platform";
import {Question} from "../../model/question/question";
import {AnswerService} from "../../services/answer.service";
import {Answer} from "../../model/answer/answer";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss'
})
export class AddQuestionComponent {
  questionForm!: FormGroup;
  platforms: Platform[];
  question: Question;
  answer: Answer;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private questionservice: QuestionService,
    private platformService: PlatformService,
    private answerService: AnswerService) {
    this.question = new Question()
    this.answer = new Answer()
  }



  ngOnInit(): void {
    this.questionForm = this.fb.group({
      questionText: [null, [Validators.required]],
    });
  }
  createEmptyAnswer(question: Question){
    this.answer.question = question;
    this.answer.textAnswer = "";
    this.answerService.submitNewAnswer(this.answer).subscribe();
  }

  onSubmit(): void {

    this.platformService.findAll().subscribe(
      data => {
        this.platforms = data;

        for(const existingPlatform of this.platforms){
          console.log(existingPlatform.id);
          this.question.platformId = existingPlatform.id;
          this.question.textQuestion = this.questionForm.get('questionText').value;
          this.questionservice.createQuestion(this.question)
            .subscribe(result => this.createEmptyAnswer(result));
          this.router.navigateByUrl("/main-view/adminpanel");

      }});



  }



}
