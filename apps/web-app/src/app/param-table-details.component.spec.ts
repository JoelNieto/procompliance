import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParamTableDetailsComponent } from './param-table-details.component';

describe('ParamTableDetailsComponent', () => {
  let component: ParamTableDetailsComponent;
  let fixture: ComponentFixture<ParamTableDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamTableDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParamTableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
