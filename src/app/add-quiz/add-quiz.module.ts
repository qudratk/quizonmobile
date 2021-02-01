import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddQuizPageRoutingModule } from './add-quiz-routing.module';

import { AddQuizPage } from './add-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      ReactiveFormsModule,
    AddQuizPageRoutingModule
  ],
  declarations: [AddQuizPage]
})
export class AddQuizPageModule {}
