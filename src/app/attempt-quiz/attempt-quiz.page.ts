import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {stringSimilarity} from 'string-similarity-js';
import * as firebase from 'firebase';
import {UtilsService} from '../services/utils.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-attempt-quiz',
    templateUrl: './attempt-quiz.page.html',
    styleUrls: ['./attempt-quiz.page.scss'],
})
export class AttemptQuizPage implements OnInit {

    markedQuiz: any = {
        courseKey: '',
        studentId: '',
        timestamp: '',
        totalMarks: '',
        achievedMarks: '',
        solvedQuestions: [],
    };
    attemptQuiz: any;
    quizForm: FormGroup;
    marksAchieved = 0;

    constructor(private formBuilder: FormBuilder,
                private navCtrl: NavController,
                private utils: UtilsService) {
        const percentage = stringSimilarity('The quick brown fox jumps over the lazy dog', 'The quck brown fx jumps over the lazy dog');
        const p: any = percentage.toFixed(2);
        console.log('string match ' + p * 100 + '%');
    }

    ngOnInit() {
        this.attemptQuiz = JSON.parse(localStorage.getItem('attemptQuiz'));
        console.log('attempt quiz ', this.attemptQuiz);
        this.formInitializer();
    }

    formInitializer() {
        this.quizForm = this.formBuilder.group({});
        for (let i = 0; i < this.attemptQuiz.questions.length; i++) {
            const questionNo = 'q' + (i + 1) + '';
            this.quizForm.addControl(questionNo, this.formBuilder.control('', Validators.required));
        }
        console.log(this.quizForm.value);
    }

    submitQuiz() {
        
        console.log(this.quizForm.value);
        this.markedQuiz.courseKey = this.attemptQuiz.courseKey;
        this.markedQuiz.totalMarks = this.attemptQuiz.totalMarks;
        this.markedQuiz.timestamp = Date.now();
        this.markedQuiz.quizKey = this.attemptQuiz.key;
        this.markedQuiz.title = this.attemptQuiz.title;
        this.markedQuiz.studentId = JSON.parse(localStorage.getItem('user')).uid;
        this.attemptQuiz.questions.forEach((question, index) => {
            const answers = this.quizForm.value;
            const qNo = `q${index + 1}`;
            const solvedQuestion = this.markQuestion(question, answers[qNo], index);
            // this.marksAchieved = this.marksAchieved + marks;
            // if (question.marks === this.marksAchieved) {
            //     question.isCorrect = true;
            // } else {
            //     question.isCorrect = false;
            // }
            // question.answerMarks = marks;
            // question.selectedAnswer = answers[qNo];
            this.markedQuiz.solvedQuestions.push(solvedQuestion);
        });
        const key = firebase.database().ref('/attemptQuizzes').push().key;
        this.markedQuiz.key = key;
        this.markedQuiz.achievedMarks = this.marksAchieved;
        firebase.database().ref(`/attemptQuizzes/${key}`).set(this.markedQuiz)
            .then(res => {
                console.log(res);
                this.utils.presentToast('Quiz submit successfully. Please check you result');
                this.navCtrl.back();
            }).catch(err => console.log(err));
    }

    markQuestion(question, answer, i) {
        const decimal: any = stringSimilarity(question.answer.toString(), answer.toString()).toFixed(2);
        const answerMatchingPercentage = decimal * 100;
        if (question.type === 'mcqs' || question.type === 'trueFalse'
            || question.type === 'fillInBlanks' && answerMatchingPercentage > 90) {
            // return question.marks;
            return this.setQuestionData(question, question.marks, answer, true);
        } else if (question.type === 'shortQuestions' && answerMatchingPercentage >= 60) {
            // return question.marks;
            return this.setQuestionData(question, question.marks, answer, true);
        } else if (question.marks >= 1 && (answerMatchingPercentage >= 40 && answerMatchingPercentage < 60)) {
            // return question.marks / 2;
            return this.setQuestionData(question, (question.marks / 2), answer, false);
        } else {
            // return 0;
            return this.setQuestionData(question, 0, answer, false);
        }
    }

    setQuestionData(question, marks, answer, result) {
        this.marksAchieved = this.marksAchieved + marks;
        question.isCorrect = result;
        question.answerMarks = marks;
        question.selectedAnswer = answer;
        return question;
    }

}
