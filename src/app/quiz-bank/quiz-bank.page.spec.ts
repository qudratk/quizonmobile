import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizBankPage } from './quiz-bank.page';

describe('QuizBankPage', () => {
  let component: QuizBankPage;
  let fixture: ComponentFixture<QuizBankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizBankPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizBankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
