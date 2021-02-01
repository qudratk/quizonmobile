import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttemptQuizPage } from './attempt-quiz.page';

describe('AttemptQuizPage', () => {
  let component: AttemptQuizPage;
  let fixture: ComponentFixture<AttemptQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttemptQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttemptQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
