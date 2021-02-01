import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttemptQuizPage } from './attempt-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: AttemptQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttemptQuizPageRoutingModule {}
