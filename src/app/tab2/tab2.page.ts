import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../services/data-collector.service';
import * as firebase from 'firebase';
import {UtilsService} from '../services/utils.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    student = true;
    faculty = false;
    facultySearch: any;
    studentSearch: any;
    filteredStudents = [];
    filteredTeachers = [];
    students: any;
    teachers: any;

    constructor(private actionCtrl: ActionSheetController,
                private dataCollector: DataCollectorService,
                private alertCtrl: AlertController,
                private utils: UtilsService,
                private navCtrl: NavController) {
        this.loadData();
    }

    ngOnInit() {
    }

    loadData() {
        setTimeout(() => {
            this.students = this.dataCollector.students;
            if (!this.students.length) {
                this.students = [];
            }
            this.filteredStudents = this.dataCollector.students;
            this.teachers = this.dataCollector.teachers;
            if (!this.teachers.length) {
                this.teachers = [];
            }
            this.filteredTeachers = this.dataCollector.teachers;
        }, 5000);
    }

    segmentChanged($event: CustomEvent) {
        this.student = !this.student;
        this.faculty = !this.faculty;
    }

    search(nameKey, myArray) {
        return myArray.filter((element) => element.email.includes(nameKey));
    }

    async moreOptions(user) {
        const alert = await this.actionCtrl.create({
            header: 'More Options !!!',
            cssClass: 'primary',
            buttons: [
                {
                    text: 'View Details',
                    icon: 'eye',
                    cssClass: 'secondary',
                    handler: () => {
                        localStorage.setItem('detailUser', JSON.stringify(user));
                        this.navCtrl.navigateForward(['/user-detail']);
                    }
                },
                {
                    text: 'Delete',
                    icon: 'trash-outline',
                    cssClass: 'danger',
                    handler: () => {
                        this.deleteUser(user);
                    }
                },
                {
                    text: 'Edit',
                    icon: 'pencil-sharp',
                    cssClass: 'primary',
                    handler: () => {
                        localStorage.setItem('detailUser', JSON.stringify(user));
                        this.navCtrl.navigateForward(['/user-detail']);
                    }
                }
            ]
        });
        await alert.present();
    }

    async deleteUser(user) {
        const alert = await this.alertCtrl.create({
            header: 'Are You sure to delete this user?',
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'primary',
                    handler: () => {}
                },
                {
                    text: 'OK',
                    cssClass: 'primary',
                    handler: () => {
                        
                        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                            .then((info) => {
                                const fuser: any = firebase.auth().currentUser;
                                fuser.delete();
                                this.deleteFromDatabase(user);
                            }).catch(err => console.log(err));
                    }
                }
            ]
        });
        alert.present();
    }

    deleteFromDatabase(user) {
        firebase.database().ref(`/users`).child(user.uid).remove()
            .then(res => {
                console.log(res);
                this.utils.presentToast('User have been deleted successfully...');
            }).catch(err => console.log(err));
    }

    searchStudents() {
        if (this.studentSearch) {
            this.filteredStudents = this.search(this.studentSearch, this.students);
        } else {
            this.filteredStudents = this.students;
        }
    }

    searchTeachers() {
        if (this.facultySearch) {
            this.filteredTeachers = this.search(this.facultySearch, this.teachers);
        } else {
            this.filteredTeachers = this.teachers;
        }
    }

    clearSearch() {
        this.studentSearch = '';
        this.filteredStudents = this.students;
        this.facultySearch = '';
        this.filteredTeachers = this.teachers;
    }

    addUser() {
        this.navCtrl.navigateForward(['/add-user']);
    }
}

