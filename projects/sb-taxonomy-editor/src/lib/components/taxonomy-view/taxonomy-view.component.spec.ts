import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyViewComponent } from './taxonomy-view.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConnectorService } from '../../services/connector.service';
import { MockFrameworkService, ConnectorMockService, serviceRes, list, ApprovalMockService} from './taxonomy-view.component.stub';
import { FrameworkService } from '../../services/framework.service';
import { of } from 'rxjs/internal/observable/of';
import { NSFramework } from '../../models/framework.model';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { ApprovalService } from '../../services/approval.service';

let global = {
  ext:{
    LeaderLine: () => {
      return '';
    } 
  }
};

describe('TaxonomyViewComponent', () => {
  let component: TaxonomyViewComponent;
  let fixture: ComponentFixture<TaxonomyViewComponent>;
  let service: FrameworkService;
  let approvalService: ApprovalService;
  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [ TaxonomyViewComponent, MatAutocomplete ],
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule, MatIconModule, BrowserAnimationsModule, ReactiveFormsModule, MatAutocompleteModule],
      providers: [
        {provide:ConnectorService, useClass: ConnectorMockService},
        {provide:FrameworkService, useClass: MockFrameworkService},
        {provide:ApprovalService, useClass: ApprovalMockService},
        MatDialog
        // FrameworkService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(FrameworkService);
    approvalService = TestBed.inject(ApprovalService);
  });
  
  afterEach(() => {
    spyOn(component, 'ngOnDestroy').and.callFake(() => { });
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make frame work read api call  ', () => {
   const getFramworkInfoSpy = spyOn(service, 'getFrameworkInfo').and.returnValue(of(serviceRes))
    service.environment = {
      frameworkName: 'fracing_fw'
    };
    component.ngOnInit();
    expect(component.isLoading).toBeFalsy();
  });

  it('should get updateTaxonomyTerm', () => {
    service.list = list;
    const updateDateSpy = spyOn(component, 'updateFinalList');
    const data = { selectedTerm: {category:'taxonomyCategory1'}, isSelected: true };
    component.updateTaxonomyTerm(data);
    expect(updateDateSpy).toHaveBeenCalled();
  });

  // it('should get updateFinalList', () => {
  //   service.list = list;
  //   const getNextCategorySpy = spyOn(service, 'getNextCategory').and.returnValue(nxtItem);
  //   const data = selctionListItem;
  //   component.updateFinalList(data);
  //   expect(getNextCategorySpy).toHaveBeenCalled();
  // });

  it('should open dialog modal to create term', () => {
    const res = {
      term: {
        category: 'taxonomyCategory2',
        
      }
    }
    let dialogSpy: jasmine.Spy;
    let dialogRefSpyObj = jasmine.createSpyObj({ open:() => {}, afterClosed : of(res), close: 
    null });
    dialogRefSpyObj.componentInstance = { body: '' };

    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    service.list = list;
   component.openCreateTermDialog(columnObj, 4);
    expect(openDialogSpy).toHaveBeenCalled();
  });

  it('should close dialog box if fail to create new term and association', () => {
    const res = {
      term: {
        category: 'taxonomyCategory2',
        
      }
    }
    let dialogSpy: jasmine.Spy;
    let dialogRefSpyObj = jasmine.createSpyObj({ open:() => {}, afterClosed : of(undefined), close: 
    null });
    dialogRefSpyObj.componentInstance = { body: '' };

    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    service.list = list;
   component.openCreateTermDialog(columnObj, 4);
    expect(openDialogSpy).toHaveBeenCalled();
  });

  it('should show published notification if created is true', () => {
    const res = {
      term: {
        category: 'taxonomyCategory2',
      },
      created:true
    }
    let dialogSpy: jasmine.Spy;
    let dialogRefSpyObj = jasmine.createSpyObj({ open:() => {}, afterClosed : of(res), close: 
    null });
    dialogRefSpyObj.componentInstance = { body: '' };
    service.selectionList = list;
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    service.list = list;
   component.openCreateTermDialog(columnObj, 4);
    expect(openDialogSpy).toHaveBeenCalled();
  });

  // it('should draw header line', () => {
  //   // const leaderLineSpy = spyOn(global.ext, 'LeaderLine')
  //   const startEle = document.createElement('div');
  //   const endEle = document.createElement('div');
  //   startEle.setAttribute('id', 'box1count');
  //   endEle.setAttribute('id', 'box1Header');
  //   component.drawHeaderLine(1);
  //   // fixture.detectChanges()
  //   // expect(leaderLineSpy).toHaveBeenCalled();
  // });

  it('should get column code', () => {
    service.list = list;
    expect(component.getColumn('taxonomyCategory1').name).toEqual('Vice President');
  });

  it('should open dialog modal to new connection', () => {
    const res = {
      source:'online',
      data: {
        endpoint:'https://compass-dev.tarento.com'
      }
    };
    let dialogSpy: jasmine.Spy;
    let dialogRefSpyObj = jasmine.createSpyObj({ open:() => {}, afterClosed : of(res), close: 
    null });
    dialogRefSpyObj.componentInstance = { body: '' };
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    service.list = list;
   component.newConnection();
    expect(openDialogSpy).toHaveBeenCalled();
  });

  it('should open dialog modal to init new connection and frmawork', () => {
    const res = {
      source:'online',
      data: {
        endpoint: undefined
      }
    };
    let dialogSpy: jasmine.Spy;
    let dialogRefSpyObj = jasmine.createSpyObj({ open:() => {}, afterClosed : of(res), close: 
    null });
    dialogRefSpyObj.componentInstance = { body: '' };
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    const initSpy = spyOn(component, 'init');
    service.list = list;
   component.newConnection();
    expect(openDialogSpy).toHaveBeenCalled();
    expect(initSpy).toHaveBeenCalled();
  });

  it('should update draft status terms', () => {
     const evn = {
        checked:true,
        term: {
          name:'floor cleaning',
          identifier: 'floorcleaning_p'
        }
      }
      component.updateDraftStatusTerms(evn);
      expect(component.draftTerms.length).toEqual(1);
  });

  it('should update draft status terms', () => {
    component.draftTerms = [
      { identifier: 'floorcleaning_p'},
      { identifier: 'floorcleaning_n'},
      { identifier: 'floorcleaning_u'}
    ];

    const evn = {
       checked:false,
       term: {
         name:'floor cleaning',
         identifier: 'floorcleaning_p'
       }
     }
     component.updateDraftStatusTerms(evn);
     expect(component.draftTerms.length).toEqual(2);
     expect(component.showActionBar).toBeTruthy();
 });

 it('should hide approval bar', () => {
    component.draftTerms = [];
    const evn = {
      checked:false,
      term: {
        name:'floor cleaning',
        identifier: 'floorcleaning_p'
      }
    }
    component.updateDraftStatusTerms(evn);
    expect(component.draftTerms.length).toEqual(0);
    expect(component.showActionBar).toBeFalsy();
  });

  it('should update draft status terms', () => {
    component.categoryList = [
      { category: 'floorcleaning_p'},
      { category: 'floorcleaning_n'},
      { category: 'floorcleaning_u'}
    ];
    const evn = {
      category: 'floorcleaning_p'
    }
    component.getNoOfCards(evn);
    expect(component.categoryList.length).toEqual(1);
  });

  it('should set count to zero when there is event category is empty', () => {
    component.categoryList = [
      { category: 'floorcleaning_p'},
      { category: 'floorcleaning_n'},
      { category: 'floorcleaning_u'}
    ];
    const evn = {
      category: ''
    }
    fixture.detectChanges();
    component.getNoOfCards(evn);
    expect(component.categoryList.length).toEqual(4);
  });

  it('should send terms for approval', () => {
    // jasmine.createSpy('createApproval').and.callThrough();
    const approvalServiceSpy = spyOn(approvalService, 'createApproval').and.returnValue(of({res:'Approval successful'}));
    component.isApprovalView = false;
    service.list = list;
    component.sendForApproval();
    expect(approvalServiceSpy).toHaveBeenCalled();
  });

  it('should send terms for approval', () => {
    // jasmine.createSpy('createApproval').and.callThrough();
    const approvalJawaSpy = spyOn(component.sentForApprove, 'emit').and.callThrough();
    component.isApprovalView = true;
    service.list = list;
    component.sendForApproval();
    expect(approvalJawaSpy).toHaveBeenCalled();
  });

  it('Should close action bar', () => {
      component.closeActionBar({})
      expect(component.showActionBar).toBeFalsy();
  });

  it('should intialise the Value', () => {
    const updateEnvironmentSpy = spyOn(service, 'updateEnvironment').and.callThrough();
      component.environment = {
        authToken:'',
        frameworkName:'fracing_fw',
    };
    component.ngOnInit();
    expect(updateEnvironmentSpy).toHaveBeenCalled();
  });

});

let status = 'Live';

let nxtItem = {
  "code": "taxonomyCategory2",
  "identifier": "fracing_fw_taxonomycategory2",
  "index": 2,
  "name": "Roles",
  "status": status as NSFramework.TNodeStatus,
  "description": "Roles of the work order",
  "translations": null,
  terms:[]
}

let selctionListItem = {
  "isSelected": true,
  "selectedTerm": {
      "identifier": "fracing_fw_taxonomycategory4_competencies_b",
      "code": "competencies_b",
      "translations": null,
      "name": "Coverage and surveillance",
      "description": "In a area, how to plan the surveillance",
      "index": 0,
      "category": "taxonomyCategory4",
      "status": "Live",
      "selected": true,
      "children": [
          {
              "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
              "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
              "translations": null,
              "name": "Level 2",
              "description": "Level 2",
              "index": 0,
              "category": "taxonomyCategory5",
              "status": "Live",
              "selected": false,
              "children": [],
              "highlight": false
          },
          {
              "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
              "code": "competencies_level_1",
              "translations": null,
              "name": "Level 1",
              "description": "Level 1",
              "index": 0,
              "category": "taxonomyCategory5",
              "status": "Live",
              "selected": false,
              "children": [],
              "highlight": false
          },
          {
              "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
              "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
              "translations": null,
              "name": "Level 3",
              "description": "Level 3 of Assessment Documentations",
              "index": 0,
              "category": "taxonomyCategory5",
              "status": "Live",
              "selected": false,
              "children": [],
              "highlight": false
          }
      ],
      "highlight": false
  }
};


let columnObj = {
  "code": "taxonomyCategory5",
  "identifier": "fracing_fw_taxonomycategory5",
  "index": 5,
  "name": "Competency Levels",
  "status": "Live",
  "description": "Competency Levels of the work order",
  "translations": null,
  "config": {
      "index": 5,
      "category": "taxonomyCategory5",
      "icon": "account_box",
      "color": "#d8666a"
  },
  "children": [
      {
          "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
          "code": "competencies_level_1",
          "translations": null,
          "name": "Level 1",
          "description": "Level 1",
          "index": 1,
          "category": "taxonomyCategory5",
          "status": "Live",
          "selected": false
      },
      {
          "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
          "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
          "translations": null,
          "name": "Level 2",
          "description": "Level 2",
          "index": 2,
          "category": "taxonomyCategory5",
          "status": "Live",
          "selected": false
      },
      {
          "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
          "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
          "translations": null,
          "name": "Level 3",
          "description": "Level 3 of Assessment Documentations",
          "index": 3,
          "category": "taxonomyCategory5",
          "status": "Live",
          "selected": false
      }
  ]
}