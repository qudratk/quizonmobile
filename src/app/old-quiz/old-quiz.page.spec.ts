import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OldQuizPage } from './old-quiz.page';

describe('OldQuizPage', () => {
  let component: OldQuizPage;
  let fixture: ComponentFixture<OldQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OldQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
