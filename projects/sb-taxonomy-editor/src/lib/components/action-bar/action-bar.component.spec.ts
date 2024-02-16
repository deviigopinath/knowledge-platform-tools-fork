import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBarComponent } from './action-bar.component';
import { HttpClientModule } from '@angular/common/http';

describe('ActionBarComponent', () => {
  let component: ActionBarComponent;
  let fixture: ComponentFixture<ActionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionBarComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send it for approval', () => {
    const sendApprovalSpy = spyOn(component.sendApproval, 'emit');
    component.sendForApproval();
    expect(sendApprovalSpy).toHaveBeenCalled();
  });

  it('should close action bar', () => {
    const closeActionSpy = spyOn(component.closeAction, 'emit');
    component.closeActionBar();
    expect(closeActionSpy).toHaveBeenCalled();
  });

  it('should get approve Level Text', () => {
    const res = 'rse_sdf_text';
    // spyOn(component, 'getApproveLevelText').and.callThrough();
    expect(component.getApproveLevelText(res)).toEqual('Approve text');
  });
  it('should return undefined if input is falsy', () => {
    const res =  undefined;
    expect(component.getApproveLevelText(res)).toBeUndefined();
  });
});
