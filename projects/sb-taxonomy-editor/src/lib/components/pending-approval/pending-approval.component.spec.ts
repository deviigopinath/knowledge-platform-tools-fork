import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApprovalComponent } from './pending-approval.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { MockFrameworkService, ApprovalMockService } from '../taxonomy-view/taxonomy-view.component.stub';
import { FrameworkService } from '../../services/framework.service';
import { ApprovalService } from '../../services/approval.service';

describe('PendingApprovalComponent', () => {
  let component: PendingApprovalComponent;
  let fixture: ComponentFixture<PendingApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingApprovalComponent, OrderByPipe ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        {provide:FrameworkService, useClass: MockFrameworkService},
        {provide: ApprovalService, useClass: ApprovalMockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove duplicate elements in the array', () => {
     expect(component.removeDuplicates(['2','4','5','4','2']).length).toEqual(3);
 });

  it('should create approval List', () => {
    const updateFieldValues = JSON.stringify([
      {category:'4g'},
      {category: '5g'},
      {category: '6g'},
      {category: '4g'}
  ]);
    expect(component.createApprovalList(updateFieldValues).length).toEqual(3);
  });

});
