import {Question} from "../question/question";

export class Answer {
  id: number;
  textAnswer: string;
  score: number;
  question: Question;
}
