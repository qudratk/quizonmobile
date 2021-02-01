import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OldQuizPage } from './old-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: OldQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OldQuizPageRoutingModule {}
