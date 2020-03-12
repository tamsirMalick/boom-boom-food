import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlatDetailPage } from './plat-detail.page';

describe('PlatDetailPage', () => {
  let component: PlatDetailPage;
  let fixture: ComponentFixture<PlatDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlatDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
