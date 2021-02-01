import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import * as firebase from 'firebase';
import {UtilsService} from '../services/utils.service';
import {DataCollectorService} from '../services/data-collector.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-quiz-bank',
    templateUrl: './quiz-bank.page.html',
    styleUrls: ['./quiz-bank.page.scss'],
})
export class QuizBankPage implements OnInit {
    selectedQuestions: any = [];
    questions: any = [];
    quizForm: FormGroup;
    mcqForm: FormGroup;
    shortQForm: FormGroup;
    FIBForm: FormGroup;
    TFForm: FormGroup;
    questionBank: any = {};

    type: any;
    bank: any;

    constructor(private alertCtrl: AlertController,
                private dataCollector: DataCollectorService,
                private utils: UtilsService,
                private formBuilder: FormBuilder,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        this.questionFormInitializer();
        this.loadData();
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

    loadData() {
        const course = JSON.parse(localStorage.getItem('course'));
        const quizBanks = this.dataCollector.quizBanks;
        this.bank = quizBanks.filter((element) => element.courseKey === course.key)[0];
        if (this.bank) {
            this.questions = this.bank.questions;
            for (let i = 0; i < this.questions; i++) {
                this.questions[i].selected = false;
            }
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

    addToCart(question, i) {
        this.questions[i].selected = true;
        this.selectedQuestions.push(question);
    }

    removeFromCart(question, i) {
        this.questions[i].selected = false;
        const index = this.selectedQuestions.indexOf(question);
        this.selectedQuestions.splice(i, 1);
    }

    addQuestionBank() {
        this.utils.presentLoading('please wait...');
        const course = JSON.parse(localStorage.getItem('course'));
        this.questionBank.questions = this.questions;
        this.questionBank.courseKey = course.key;
        let key;
        if (this.bank) {
            key = this.bank.key;
        } else {
            key = firebase.database().ref('/quizBanks').push().key;
        }
        this.questionBank.key = key;
        firebase.database().ref(`quizBanks/${key}`).set(this.questionBank).then(res => {
            console.log(res);
            this.utils.stopLoading();
            this.utils.presentToast('Quiz bank successfully Added.');
            this.navCtrl.back();
        }).catch(err => {
            this.utils.stopLoading();
            console.log(err);
        });
    }

    saveSelectedQuestions() {
        localStorage.setItem('selectedQuestions', JSON.stringify(this.selectedQuestions));
        this.navCtrl.back();
    }

    addMCQ() {
        
        this.questions.push(this.mcqForm.value);
        this.mcqForm.reset();
        this.shortQForm.reset();
        this.FIBForm.reset();
        this.TFForm.reset();
    }

    addFIB() {
        
        this.questions.push(this.FIBForm.value);
        this.mcqForm.reset();
        this.shortQForm.reset();
        this.FIBForm.reset();
        this.TFForm.reset();
    }

    addSQ() {
        
        this.questions.push(this.shortQForm.value);
        this.mcqForm.reset();
        this.shortQForm.reset();
        this.FIBForm.reset();
        this.TFForm.reset();
    }

    addTF() {
        
        this.questions.push(this.TFForm.value);
        this.mcqForm.reset();
        this.shortQForm.reset();
        this.FIBForm.reset();
        this.TFForm.reset();
    }
}
