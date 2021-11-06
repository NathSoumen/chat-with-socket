import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketChartComponent } from './socket-chart.component';

describe('SocketChartComponent', () => {
  let component: SocketChartComponent;
  let fixture: ComponentFixture<SocketChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocketChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
