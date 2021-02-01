import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../services/data-collector.service';
import {UtilsService} from '../services/utils.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';

@Component({
    selector: 'app-add-quiz',
    templateUrl: './add-quiz.page.html',
    styleUrls: ['./add-quiz.page.scss'],
})
export class AddQuizPage implements OnInit {

    quiz: any = {};
    questions: any = [];
    quizForm: FormGroup;
    mcqForm: FormGroup;
    shortQForm: FormGroup;
    FIBForm: FormGroup;
    TFForm: FormGroup;
    type: string;
    marks = 0;

    constructor(private alertCtrl: AlertController,
                private navCtrl: NavController,
                private utils: UtilsService,
                private formBuilder: FormBuilder,
                private dataCollector: DataCollectorService) {
    }

    ngOnInit() {
        this.formInitializer();
        this.questionFormInitializer();
    }

    formInitializer() {
        this.quizForm = this.formBuilder.group({
            title: [null, [Validators.required]],
            totalMarks: [null, [Validators.required]],
            date: [null, [Validators.required]],
            time: [null, [Validators.required]],
            questions: [null, [Validators.required]]
        });
    }

    questionFormInitializer() {
        this.mcqForm = this.formBuilder.group({
            type: ['mcqs', [Validators.required]],
            answer: [null, [Validators.required]],
            optionA: [null, [Validators.required]],
            optionB: [null, [Validators.required]],
            optionC: [null, [Validators.required]],
            optionD: [null, [Validators.required]],
            question: [null, [Validators.required]],
            marks: [null, [Validators.required]],
        });
        this.shortQForm = this.formBuilder.group({
            type: ['shortQuestions', [Validators.required]],
            answer: [null, [Validators.required]],
            question: [null, [Validators.required]],
            marks: [null, [Validators.required]],
        });
        this.TFForm = this.formBuilder.group({
            type: ['trueFalse', [Validators.required]],
            answer: [null, [Validators.required]],
            optionA: ['True', [Validators.required]],
            optionB: ['False', [Validators.required]],
            question: [null, [Validators.required]],
            marks: [null, [Validators.required]],
            getReason: [null, [Validators.required]]
        });
        this.FIBForm = this.formBuilder.group({
            type: ['fillInBlanks', [Validators.required]],
            marks: [null, [Validators.required]],
            part1: [null, [Validators.required]],
            part2: [null, [Validators.required]],
            answer: [null, [Validators.required]]
        });
    }

    ionViewDidEnter() {
        const questions = JSON.parse(localStorage.getItem('selectedQuestions'));
        if (questions.length) {
            for (const q of questions) {
                this.marks = this.marks + q.marks;
                this.questions.push(q);
            }
            this.quizForm.controls.questions.setValue(this.questions);
            console.log('questions', this.questions);
        }
    }

    expandDonation(quiz: any) {
        quiz.show = !quiz.show;
    }

    changeValue(event) {
        this.type = event.detail.value;
        if (this.type === 'mcqs') {
            this.mcqForm.controls.type.setValue(this.type);
        } else if (this.type === 'shortQuestions') {
            this.shortQForm.controls.type.setValue(this.type);
        } else if (this.type === 'fillInBlanks') {
            this.FIBForm.controls.type.setValue(this.type);
        } else if (this.type === 'trueFalse') {
            this.TFForm.controls.type.setValue(this.type);
        }
    }

    async presentAlert(question: any) {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: question?.question,
            message: '<strong>Ans: </strong>' + question?.answer,
            buttons: [{
                text: 'Okay',
                handler: () => {
                }
            }]
        });
        await alert.present();
    }

    addFromBank() {
        this.navCtrl.navigateForward(['/quiz-bank']);
    }

    addQuiz() {
        console.log(this.quizForm.value);
        console.log(this.questions);
        this.utils.presentLoading('please wait...');
        const key = firebase.database().ref('/quizzes').push().key;
        this.quiz.key = key;
        this.quiz.questions = this.questions;
        this.quiz.title = this.quizForm.value.title;
        this.quiz.date = this.quizForm.value.date;
        this.quiz.time = this.quizForm.value.time;
        this.quiz.totalMarks = this.quizForm.value.totalMarks;
        const course = JSON.parse(localStorage.getItem('course'));
        this.quiz.courseKey = course.key;
        firebase.database().ref(`/quizzes/${key}`).set(this.quiz).then(res => {
            localStorage.setItem('selectedQuestions', null);
            this.utils.stopLoading();
            this.utils.presentToast('Quiz Added successfully. Thanks For using Quiz App.');
            this.navCtrl.back();
        }).catch(err => {
            console.log(err);
            this.utils.stopLoading();
        });
    }

    addMCQ() {
        if ((this.mcqForm.value.marks + this.marks) > this.quizForm.value.totalMarks) {
            this.utils.presentAlert('Marks Limit Exceeded. Please increase the total marks to add more questions.');
        } else {
            this.marks = this.marks + this.mcqForm.value.marks;
            this.questions.push(this.mcqForm.value);
            this.quizForm.controls.questions.setValue(this.questions);
            this.mcqForm.reset();
            this.shortQForm.reset();
            this.FIBForm.reset();
            this.TFForm.reset();
        }
    }

    addFIB() {
        console.log(this.FIBForm.value);
        if ((this.FIBForm.value.marks + this.marks) > this.quizForm.value.totalMarks) {
            this.utils.presentAlert('Marks Limit Exceeded. Please increase the total marks to add more questions.');
        } else {
            this.marks = this.marks + this.FIBForm.value.marks;
            this.questions.push(this.FIBForm.value);
            this.quizForm.controls.questions.setValue(this.questions);
            this.mcqForm.reset();
            this.shortQForm.reset();
            this.FIBForm.reset();
            this.TFForm.reset();
        }
    }

    addSQ() {
        console.log(this.shortQForm.value);
        if ((this.shortQForm.value.marks + this.marks) > this.quizForm.value.totalMarks) {
            this.utils.presentAlert('Marks Limit Exceeded. Please increase the total marks to add more questions.');
        } else {
            this.marks = this.marks + this.shortQForm.value.marks;
            this.questions.push(this.shortQForm.value);
            this.quizForm.controls.questions.setValue(this.questions);
            this.mcqForm.reset();
            this.shortQForm.reset();
            this.FIBForm.reset();
            this.TFForm.reset();
        }
    }

    addTF() {
        if ((this.TFForm.value.marks + this.marks) > this.quizForm.value.totalMarks) {
            this.utils.presentAlert('Marks Limit Exceeded. Please increase the total marks to add more questions.');
        } else {
            this.marks = this.marks + this.TFForm.value.marks;
            this.questions.push(this.TFForm.value);
            this.quizForm.controls.questions.setValue(this.questions);
            this.mcqForm.reset();
            this.shortQForm.reset();
            this.FIBForm.reset();
            this.TFForm.reset();
        }
    }
}
