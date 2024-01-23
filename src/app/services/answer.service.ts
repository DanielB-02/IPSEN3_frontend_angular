import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {isEmpty, Observable} from 'rxjs';
import { Answer } from '../model/answer/answer';

import {environment} from "../environments/environment";
import {AnswerForm} from "../model/api/answer-form/answer-form";
import {QuestionService} from "./question.service";
import {Question} from "../model/question/question";

const BASIC_URL = environment['BASIC_URL'];

@Injectable({ providedIn: 'root' })
export class AnswerService {
  private answersUrl: string;

  constructor(
    private questionService: QuestionService,
    private http: HttpClient) {
    this.answersUrl = BASIC_URL + 'answer';
  }

  getAnswersOfQuestion(questionId: string): Observable<Answer[]> {
    const url = `${this.answersUrl}/question/${questionId}`;
    return this.http.get<Answer[]>(url);
  }

  submitAlteredAnswer(answer: Answer): Observable<Answer> {
    const url: string = `${this.answersUrl}/${answer.id}`;
    const answerForm : AnswerForm = {
      textAnswer: answer.textAnswer,
      questionId: answer.question.id,
      score: this.checkIfRisico(answer)
    };
    return this.http.put<Answer>(url, answerForm);
  }

  checkIfRisico(answer: Answer){
    if (answer.textAnswer.trim().length === 0){
      return 0;
    }
    switch (answer.question.textQuestion){
      case "Jurisprudentie":
        return 3;

      case "Online Outreach":
      case "Wetenschappelijke artikelen":
      case "Krantenartikelen":
      case "Chat met Fier":
      case "Meldingen overig":
        return 1;

      default:
        return 0;

    }


  };


  submitNewAnswer(answer: Answer): Observable<Answer> {
    const url: string = this.answersUrl;
    const answerForm : AnswerForm = {
      textAnswer: answer.textAnswer,
      questionId: answer.question.id,
      score: 0
    };
    return this.http.post<Answer>(url, answerForm);
  }


}
