import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizBankPageRoutingModule } from './quiz-bank-routing.module';

import { QuizBankPage } from './quiz-bank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      ReactiveFormsModule,
    QuizBankPageRoutingModule
  ],
  declarations: [QuizBankPage]
})
export class QuizBankPageModule {}
