import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyColumnViewComponent } from './taxonomy-column-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ConnectorService } from '../../services/connector.service';
import { ApprovalMockService, ConnectorMockService, MockFrameworkService, approvalTerm, serviceRes } from '../taxonomy-view/taxonomy-view.component.stub';
import { FrameworkService } from '../../services/framework.service';
import { ApprovalService } from '../../services/approval.service';
import { of } from 'rxjs/internal/observable/of';
import { TermCardComponent } from '../term-card/term-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';


describe('TaxonomyColumnViewComponent', () => {
  let component: TaxonomyColumnViewComponent;
  let fixture: ComponentFixture<TaxonomyColumnViewComponent>;
  let frameworkService: FrameworkService;
  let approvalService: ApprovalService;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonomyColumnViewComponent, TermCardComponent ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatMenuModule
      ],
      providers: [
        ConnectorService,
        {provide:ConnectorService, useClass: ConnectorMockService},
        {provide:FrameworkService, useClass: MockFrameworkService},
        {provide:ApprovalService, useClass: ApprovalMockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomyColumnViewComponent);
    component = fixture.componentInstance;
    component.column = {
      index:1,
      code:'4g',
      children:[
        ...approvalTerm
      ]
    };
    fixture.detectChanges();
    frameworkService = TestBed.inject(FrameworkService);
    approvalService = TestBed.inject(ApprovalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update approval list', () => {
    component.approvalTerm = [];
    const getUpdateListSpy = spyOn(approvalService, 'getUpdateList').and.returnValue(of(approvalTerm));
    component.getApprovalList();
    expect(getUpdateListSpy).toHaveBeenCalled();
    expect(component.approvalTerm.length).toEqual(1);
  });

  it('should update taxonomy term', () => {
     component.termshafall = [{name:'t1', identifier:'a'}, {name:'t2', identifier:'b'}];
    frameworkService.currentSelection.next({type:'4g', data:['4g','4g']});
    const updateTaxonomyTermSpy = spyOn(component.updateTaxonomyTerm, 'emit');
    component.subscribeEvents();
    expect(updateTaxonomyTermSpy).toHaveBeenCalled();
  });

  it('should return selection list is undefned', () => {
    component.termshafall = [{name:'t1', identifier:'a'}, {name:'t2', identifier:'b'}];
   frameworkService.currentSelection.next(null);
   const updateTaxonomyTermSpy = spyOn(component.updateTaxonomyTerm, 'emit');
   component.subscribeEvents();
   expect(updateTaxonomyTermSpy).not.toHaveBeenCalled();
  });

  it('should handle the exception', () => {
    const updateTermListSpy = spyOn(component.updateTermList, 'emit' );
      component.selectedCard({});
      expect(updateTermListSpy).toHaveBeenCalled();
  });
  
});
