import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../model/question/question';

import {environment} from "../environments/environment";

const BASIC_URL = environment['BASIC_URL'];

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private platformsUrl: string;

  constructor(private http: HttpClient) {
    this.platformsUrl = BASIC_URL + 'question';
  }

  getQuestionsForPlatform(platformId: string): Observable<Question[]> {
    const url = `${this.platformsUrl}/platform/${platformId}`;
    return this.http.get<Question[]>(url);
  }

  public createQuestion(question: Question){
    return this.http.post<Question>(this.platformsUrl, question);
  }

}
