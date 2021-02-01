import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, NavController} from '@ionic/angular';

import * as firebase from 'firebase';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private service: UserService,
                private navCtrl: NavController,
                private readonly loadingCtrl: LoadingController) {
    }

    loading: any;
    loginForm: FormGroup;
    passwordType = 'password';
    passwordIcon = 'eye-off';

    ngOnInit() {
        this.formInitializer();
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    formInitializer() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    async login() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const formData = this.loginForm.value;
        firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).then(res => {
            console.log(res);
            if (res.user.emailVerified) {
                this.saveUser(res.user.uid);
            } else {
                alert('Please verify your email first.');
            }
            if (this.loading) {
                this.loading.dismiss();
            }
        }).catch(error => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(error);
        });
    }

    async saveUser(id) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref(`users/${id}`).on('value', snapshot => {
            this.service.setUser(snapshot.val());
            if (this.loading) {
                this.loading.dismiss();
            }
            const isAdmin = snapshot.val().isAdmin;
            console.log('is Admin: ', isAdmin);
            if (isAdmin) {
                this.navCtrl.navigateRoot(['tabs/tab2']);
            } else if (!isAdmin) {
                this.navCtrl.navigateRoot(['tabs/tab1']);
            }
        });
    }

    registerUser() {
        this.navCtrl.navigateForward(['/signup']);
    }

    forgotPassword() {
        this.navCtrl.navigateForward(['/forget-password']);
    }
}
