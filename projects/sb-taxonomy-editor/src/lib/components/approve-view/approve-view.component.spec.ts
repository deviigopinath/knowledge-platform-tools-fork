import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveViewComponent } from './approve-view.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApprovalService } from '../../services/approval.service';
import { ApprovalMockService } from '../taxonomy-view/taxonomy-view.component.stub';
import { of } from 'rxjs/internal/observable/of';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('ApproveViewComponent', () => {
  let component: ApproveViewComponent;
  let fixture: ComponentFixture<ApproveViewComponent>;
  let approvalService: ApprovalService;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveViewComponent ],
      imports: [HttpClientModule, RouterModule, RouterTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      providers:[
        {provide:ApprovalService, useClass:ApprovalMockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveViewComponent);
    approvalService = TestBed.inject(ApprovalService);
    
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get workflow details', () => {
    const approvalServiceSpy = spyOn(approvalService, 'getWorkflowDetails').and.returnValue(of({
      result:{
        updateFieldValues: [
          {name:'sas', selected:true}
        ]
      }}));
      approvalService.getWorkflowDetails('asa').subscribe(res =>{
        expect(component.listItems.length).toBeGreaterThan(0);
      }); 
  });

  it('should send it for approcal request', () => {
    const approvalServiceSpy = spyOn(approvalService, 'updateWorkFlowApproval').and.returnValue(of({
      result:{
        updateFieldValues: [
          {name:'sas', selected:true}
        ]
      }}));
      component.approvalRequest(['sas', 'floor', 'measure']);
      approvalService.updateWorkFlowApproval('sas').subscribe(res =>{
        expect(approvalServiceSpy).toHaveBeenCalled();
      }); 
  });

});
