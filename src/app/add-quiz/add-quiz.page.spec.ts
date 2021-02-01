import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddQuizPage } from './add-quiz.page';

describe('AddQuizPage', () => {
  let component: AddQuizPage;
  let fixture: ComponentFixture<AddQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
