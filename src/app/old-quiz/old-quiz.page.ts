import {Component, OnInit} from '@angular/core';
import {DataCollectorService} from '../services/data-collector.service';

@Component({
    selector: 'app-old-quiz',
    templateUrl: './old-quiz.page.html',
    styleUrls: ['./old-quiz.page.scss'],
})
export class OldQuizPage implements OnInit {
    isStudent = false;
    isTeacher = true;

    myOldQuiz: any;
    oldQuiz: any;

    constructor(private dataCollector: DataCollectorService) {
        this.oldQuiz = JSON.parse(localStorage.getItem('oldQuiz'));
        console.log(this.oldQuiz);
    }

    ngOnInit() {
        const data = this.dataCollector.myAttemptQuizez.filter(quiz => quiz.quizKey === this.oldQuiz.key);
        console.log('data', data);
        if (data) {
            this.myOldQuiz = data[0];
        }
    }

    getColor(question, option) {
        const optionIs = `option${option}`;
        if ((question.selectedAnswer === question[optionIs])) {
            return 'danger';
        } else if ((question.answer === option)) {
            return 'success';
        } else {
            return '';
        }
    }
}
