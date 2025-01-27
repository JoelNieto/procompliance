import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParamTablesFormComponent } from './param-tables-form.component';

describe('ParamTablesFormComponent', () => {
  let component: ParamTablesFormComponent;
  let fixture: ComponentFixture<ParamTablesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamTablesFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParamTablesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
