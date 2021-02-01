import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddQuizPage } from './add-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: AddQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddQuizPageRoutingModule {}
