import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrolleyPage } from './trolley.page';

describe('TrolleyPage', () => {
  let component: TrolleyPage;
  let fixture: ComponentFixture<TrolleyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrolleyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrolleyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
