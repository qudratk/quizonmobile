import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, LoadingController, ToastController} from '@ionic/angular';
import * as firebase from 'firebase';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-admin-chat',
    templateUrl: './admin-chat.page.html',
    styleUrls: ['./admin-chat.page.scss'],
})
export class AdminChatPage implements OnInit {
    messages = [];
    user: any;
    selectedEmail: any;
    newMsg: '';
    loading: any;
    @ViewChild(IonContent) content: IonContent;

    constructor(private readonly loadingCtrl: LoadingController,
                private service: UserService,
                private readonly toastCtrl: ToastController) {
        this.user = this.service.getUser();
    }

    ngOnInit() {
        this.selectedEmail = localStorage.getItem('selectedEmail');
        this.loadMessages();
    }

    loadMessages() {
        const ref = 'admin-' + this.selectedEmail.split('.').join('');
        firebase.database().ref(`chat/${ref}/messages`).orderByChild('time').on('value', snapshot => {
            this.messages = [];
            // tslint:disable-next-line:no-
            ;
            snapshot.forEach((node) => {
                this.messages.push(node.val());
                console.log(this.messages);
            });
        }, err => {
            alert(err);
        });
    }

    sendMessage() {
        const ref = 'admin-' + this.selectedEmail.split('.').join('');
        const key = firebase.database().ref().push().key;
        if (!this.messages.length) {
            firebase.database().ref(`chat/${ref}`).set({
                sender: this.selectedEmail,
            }).then(res => {
            }).catch(err => console.log(err));
        }
        firebase.database().ref(`chat/${ref}/messages`).child(key).set({
            sender: 'admin',
            name: this.user.fullName,
            time: Date.now(),
            message: this.newMsg
        }).then(res => {
        }).catch(err => console.log(err));
        this.newMsg = '';
        setTimeout(() => {
            this.content.scrollToBottom(10);
        });
    }
}
