import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AttemptQuizPageRoutingModule} from './attempt-quiz-routing.module';

import {AttemptQuizPage} from './attempt-quiz.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        AttemptQuizPageRoutingModule
    ],
    declarations: [AttemptQuizPage]
})
export class AttemptQuizPageModule {
}
