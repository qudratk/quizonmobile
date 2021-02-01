import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OldQuizPageRoutingModule } from './old-quiz-routing.module';

import { OldQuizPage } from './old-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OldQuizPageRoutingModule
  ],
  declarations: [OldQuizPage]
})
export class OldQuizPageModule {}
