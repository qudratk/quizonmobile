import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizBankPage } from './quiz-bank.page';

const routes: Routes = [
  {
    path: '',
    component: QuizBankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizBankPageRoutingModule {}
