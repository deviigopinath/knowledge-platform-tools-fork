import { TestBed } from '@angular/core/testing';

import { ApprovalService } from './approval.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';

describe('ApprovalService', () => {
  let service: ApprovalService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers:[ApprovalService]
  }));
  beforeEach(() => {
    service = TestBed.inject(ApprovalService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create approval service', () => {
     service.createApproval({}).subscribe((response:any) =>{
      expect(response.res).toEqual('created Approval list?');
    });
    const req = httpTestingController.expectOne('/api/workflow/taxonomy/create');
    expect(req.request.method).toEqual('POST');
    req.flush({res:'created Approval list?'})
    httpTestingController.verify();
  });

  it('should get approval list', () => {
   service.getApprovalList({}).subscribe((response:any) =>{
      expect(response.length).toEqual(1);
    });
    const req = httpTestingController.expectOne('/api/workflow/taxonomy/search');
    expect(req.request.method).toEqual('POST');
    req.flush(['item1']);
    httpTestingController.verify();
  });

  it('should get approval terms by id', () => {
    service.getWorkflowDetails('111').subscribe((response:any) =>{
       expect(response.length).toEqual(1);
     });
     const req = httpTestingController.expectOne('/api/workflow/taxonomy/read/111');
     expect(req.request.method).toEqual('GET');
     req.flush(['item1']);
     httpTestingController.verify();
   });


   it('should update workflow updates', () => {
    service.updateWorkFlowApproval('111').subscribe((response:any) =>{
       expect(response.length).toEqual(1);
     });
     const req = httpTestingController.expectOne('api/workflow/taxonomy/update');
     expect(req.request.method).toEqual('PATCH');
     req.flush(['item1']);
     httpTestingController.verify();
   });

   it('should remove duplicate elements in the array', () => {
     
      expect(service.removeDuplicates(['2','4','5','4','2']).length).toEqual(3)
   });

});
