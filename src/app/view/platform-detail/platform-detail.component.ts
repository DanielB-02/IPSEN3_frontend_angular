import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Question} from "../../model/question/question";
import {QuestionService} from "../../services/question.service";
import {Platform} from "../../model/platform/platform";
import {PlatformService} from "../../services/platform.service";
import {Answer} from "../../model/answer/answer";
import {AnswerService} from "../../services/answer.service";
import { forkJoin } from 'rxjs';
import {map} from "rxjs";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {UserStorageService} from "../../auth/user-storage.service";

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
  isReadonly: boolean = false;

  constructor(private route: ActivatedRoute,
              private answerService: AnswerService,
              private questionService: QuestionService,
              private platformService: PlatformService,
              private userStorageService: UserStorageService) {
  }

  ngOnInit(): void {
    this.platformId = this.route.snapshot.paramMap.get('id');
    this.loadPlatform();
    this.loadQuestions();
    this.isReadonly = this.userStorageService.isReadonly()
  }

  onSubmitAlteredAnswer(answer: Answer): void {
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


        const answerObservables = this.questions.map(question => this.loadAnswer(question.id));


        forkJoin(answerObservables).subscribe(answersArray => {

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

  @ViewChild('pdfContent') pdfContent: ElementRef;

  generatePDF(): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;
    let yPos = 20;

    // Title
    doc.setFontSize(18);
    let lines = doc.splitTextToSize(`Platform: ${this.platform?.platformName}`, maxLineWidth); // Split the line
    lines.forEach(line => {
      doc.text(line, margin, yPos);
      yPos += 10;
    });
    yPos += 10;


    const lineHeight = 10;

    this.questions.forEach((question, index) => {
      // Check for new page
      if (yPos + lineHeight >= doc.internal.pageSize.height - margin) {
        doc.addPage();
        yPos = margin;
      }

      doc.setFontSize(16);
      lines = doc.splitTextToSize(`Question ${index + 1}: ${question.textQuestion}`, maxLineWidth);
      lines.forEach(line => {
        if (yPos + lineHeight >= doc.internal.pageSize.height - margin) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(line, margin, yPos);
        yPos += lineHeight;
      });
      yPos += 5;

      question.answers.forEach((answer, answerIndex) => {
        // Answers
        doc.setFontSize(12);
        lines = doc.splitTextToSize(`Answer ${answerIndex + 1}: ${answer.textAnswer}`, maxLineWidth);
        lines.forEach(line => {
          if (yPos + lineHeight >= doc.internal.pageSize.height - margin) {
            doc.addPage();
            yPos = margin;
          }
          doc.text(line, margin, yPos);
          yPos += lineHeight;
        });
        yPos += 5;
      });

      yPos += 5;
    });

    doc.save(`platform-${this.platform?.platformName}.pdf`);
  }
}
