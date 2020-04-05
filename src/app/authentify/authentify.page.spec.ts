import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthentifyPage } from './authentify.page';

describe('AuthentifyPage', () => {
  let component: AuthentifyPage;
  let fixture: ComponentFixture<AuthentifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthentifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthentifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
