import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermCardComponent } from './term-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FrameworkService } from '../../services/framework.service';

class MockFrameworkService {
    rootConfig =  [
      {   
          "index": 1,
          "category": "board",
          "icon": "settings",
          "color": "#1d2327"
      },
      {   
          "index": 2,
          "category": "medium",
          "icon": "extension",
          "color": "#541675"
      },
      {   
          "index": 3,
          "category": "gradeLevel",
          "icon": "bar_chart",
          "color": "#9a6c80"
      },
      {   
          "index": 4,
          "category": "subject",
          "icon": "account_box",
          "color": "#d8666a"
      }
  ];
  environment: {
    frameworkName: 'fracing_fw',
    authToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0WEFsdFpGMFFhc1JDYlFnVXB4b2RvU2tLRUZyWmdpdCJ9.mXD7cSvv3Le6o_32lJplDck2D0IIMHnv0uJKq98YVwk',
    isApprovalRequired: true
  }

  getEnvironment() {
    return this.environment;
  }

  getConfig(){
    return this.rootConfig;
  }
}
let cardRef;

describe('TermCardComponent', () => {
  let component: TermCardComponent;
  let fixture: ComponentFixture<TermCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermCardComponent ],
      imports: [HttpClientModule, MatDialogModule, MatMenuModule],
      providers:[
        { provide: FrameworkService, useClass:MockFrameworkService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermCardComponent);
    component = fixture.componentInstance;
    component.data = {
      children:[],
      index:1
    };
    fixture.detectChanges();
    cardRef = fixture.debugElement.nativeElement.querySelector('#cardRef')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
