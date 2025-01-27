import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParamTablesComponent } from './param-tables.component';

describe('ParamTablesComponent', () => {
  let component: ParamTablesComponent;
  let fixture: ComponentFixture<ParamTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamTablesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParamTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
