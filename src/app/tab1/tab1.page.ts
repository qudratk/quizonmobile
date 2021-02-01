import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../services/data-collector.service';
import {UtilsService} from '../services/utils.service';
import * as firebase from 'firebase';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    allCourses: any;
    courses: any;
    user: any = {};
    loading = true;

    constructor(private alertController: AlertController,
                private dataCollector: DataCollectorService,
                private utils: UtilsService,
                private service: UserService,
                private navCtrl: NavController) {
        this.user = service.getUser();
        setTimeout(() => {
            this.allCourses = dataCollector.courses;
            if (this.user.isStudent) {
                this.courses = this.dataCollector.getCoursesByStudentId(this.user.uid);
                console.log('courses', this.courses);
                this.checkCourses();
            } else {
                this.courses = this.dataCollector.getCoursesByTeacherId(this.user.uid);
                this.checkCourses();
            }
        }, 5000);
    }

    ngOnInit() {

    }

    checkCourses() {
        if (this.courses) {
            this.loading = false;
        } else {
            this.loading = true;
        }
    }

    loadDataAgain(event) {
        this.allCourses = this.dataCollector.courses;
        if (this.user.isStudent) {
            this.courses = this.dataCollector.getCoursesByStudentId(this.user.uid);
            console.log('courses', this.courses);
        } else {
            this.courses = this.dataCollector.getCoursesByTeacherId(this.user.uid);
        }
        setTimeout(() => {
            event.target.complete();
            if (this.courses) {
                this.loading = true;
            } else {
                this.loading = false;
            }
        }, 2000);
    }

    async joinClass() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Join New Course !!!',
            inputs: [
                {
                    name: 'code',
                    type: 'text',
                    placeholder: 'Enter Class Code'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        this.joinCourseInDatabase(data.code);
                        console.log('Confirm Ok');
                    }
                }
            ]
        });
        await alert.present();
    }

    joinCourseInDatabase(code) {
        const courses = this.allCourses.filter((c) => c.courseCode === code);
        if (courses.length) {
            const key = firebase.database().ref('student_course').push().key;
            firebase.database().ref(`student_course/${key}`).set({
                courseKey: courses[0].key,
                courseCode: courses[0].courseCode,
                studentId: this.user.uid
            }).then(res => this.courses.push(courses[0]));
        } else {
            this.utils.presentToast('Enter Correct course code...');
        }
    }

    addCourse() {
        this.navCtrl.navigateForward(['/add-course']);
    }

    getNoOfStudents(key) {
        const noOfStudents = this.dataCollector.filterStudentsOfCourses(key);
        return noOfStudents;
    }
    goToDetail(course) {
        localStorage.setItem('course', JSON.stringify(course));
        this.navCtrl.navigateForward(['/course-detail']);
    }
}
