import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFrameworkComponent } from './config-framework.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

xdescribe('ConfigFrameworkComponent', () => {
  let component: ConfigFrameworkComponent;
  let fixture: ComponentFixture<ConfigFrameworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigFrameworkComponent ],
      imports: [HttpClientModule, MatDialogModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
