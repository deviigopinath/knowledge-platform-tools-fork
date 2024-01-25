import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FrameworkService } from '../../services/framework.service';
import { of } from 'rxjs/internal/observable/of';

class MockService {

  getFrameworkInfo(){
    return of( {
      frameworkName:'fracing_fw',
      authToken:'exssrxtgsdsds'
    })
  }
  
}
describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      imports: [HttpClientModule],
      providers: [
        { provide: FrameworkService, useClass: MockService }
      ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
