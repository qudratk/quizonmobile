import {Component, Inject, OnInit} from '@angular/core';
import {ActionSheetController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../../services/data-collector.service';
import {UtilsService} from '../../services/utils.service';

@Component({
    selector: 'app-course-detail',
    templateUrl: './course-detail.page.html',
    styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {

    course: any;
    olQuizzes: any = [];
    upComingQuizzes: any = [];
    const;
    quizzes: any = [];
    user: any;
    constructor(private navCtrl: NavController,
                private dataCollector: DataCollectorService,
                private utils: UtilsService,
                private actionCtrl: ActionSheetController) {
    }

    ngOnInit() {
        this.devidQuizzes();
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    devidQuizzes() {
        this.course = JSON.parse(localStorage.getItem('course'));
        this.quizzes = this.dataCollector.filterQuizzesByCourseId(this.course.key);
        if (this.quizzes) {
            this.quizzes.forEach(quiz => {
                const currentDte = new Date();
                // console.log(currentDte);
                const quizDate = new Date(quiz.date);
                // console.log(quizDate);
                if (quizDate < currentDte || this.checkTime(quiz.time)) {
                    this.olQuizzes.push(quiz);
                }
            });
            this.quizzes.forEach(quiz => {
                const currentDte = new Date();
                // console.log(currentDte);
                const quizDate = new Date(quiz.date);
                // console.log(quizDate);
                if (quizDate > currentDte || quizDate.toDateString() === currentDte.toDateString()) {
                    this.upComingQuizzes.push(quiz);
                }
            });
        }
    }

    async teacherOptions() {
        const alert = await this.actionCtrl.create({
            cssClass: 'my-custom-class',
            buttons: [
                {
                    text: 'Download Report',
                    icon: 'cloud-download',
                    cssClass: 'primary',
                    handler: () => {
                        this.downloadReport();
                    }
                },
                {
                    text: 'Add Quiz',
                    icon: 'add-circle',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/add-quiz']);
                    }
                },
                {
                    text: 'Quiz Bank',
                    icon: 'home',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/quiz-bank']);
                    }
                },
                {
                    text: 'View Students',
                    icon: 'people',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/students']);
                    }
                }
            ]
        });
        await alert.present();
    }

    goToDetail(quiz) {
        localStorage.setItem('oldQuiz', JSON.stringify(quiz));
        this.navCtrl.navigateForward(['/old-quiz']);
    }

    attemptQuiz(quiz) {
        const varDate = new Date(quiz.date);
        const today = new Date();
        // if (varDate.toDateString() === today.toDateString() && this.checkTime(quiz.time)) {
        localStorage.setItem('attemptQuiz', JSON.stringify(quiz));
        this.navCtrl.navigateForward(['/attempt-quiz']);
        // } else {
        //     this.utils.presentAlert('Please wait until quiz time start. Thanks');
        // }
    }

    checkTime(date) {
        const qd = new Date(date); // quiz time
        const qhours = qd.getHours();
        const qmins = qd.getMinutes();
        const qday = qd.getDay();
        const d = new Date(); // current time
        const hours = d.getHours();
        const mins = d.getMinutes();
        const day = d.getDay();
        if (hours === qhours && (mins >= qmins && mins <= qmins + 10)) {
            return true;
        } else if (hours === qhours && !(mins >= qmins && mins <= qmins + 10)) {
            // if quiz time passed.
            return false;
        }
    }

    async studentOptions() {
        const alert = await this.actionCtrl.create({
            cssClass: 'my-custom-class',
            buttons: [
                {
                    text: 'View Progress',
                    icon: 'bar-chart',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/result']);
                    }
                },
                {
                    text: 'Help desk',
                    icon: 'mail',
                    cssClass: 'primary',
                    handler: () => {
                        this.utils.presentAlert('Help Desk not yet implemented');
                    }
                }
            ]
        });
        await alert.present();
    }

    private downloadReport() {
        window.location.href = 'https://quizonmobile.herokuapp.com/';
    }
}
