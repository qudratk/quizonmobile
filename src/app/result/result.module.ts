import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ResultPageRoutingModule} from './result-routing.module';
import {ChartsModule} from 'ng2-charts';
import {ResultPage} from './result.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChartsModule,
        ResultPageRoutingModule
    ],
    declarations: [ResultPage]
})
export class ResultPageModule {
}
