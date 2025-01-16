import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscardsComponent } from './discards.component';

describe('DiscardsComponent', () => {
  let component: DiscardsComponent;
  let fixture: ComponentFixture<DiscardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
