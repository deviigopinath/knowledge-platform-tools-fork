import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CreateTermComponent } from './create-term.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { of } from 'rxjs';
import { FrameworkService } from '../../services/framework.service';
import * as appConstants from '../../constants/app-constant';
import { list } from '../taxonomy-view/taxonomy-view.component.stub'
class MockFrameworkService {
  createTerm(){
    return of({});
  }

  publishFramework() {
    return of({});
  }
  getUuid() {
    return 'sdda1211';
  }
  updateTerm(){
    return of({});
  }
  getEnvironment() {
    return of({});
  }
}

describe('CreateTermComponent', () => {
  let component: CreateTermComponent;
  let fixture: ComponentFixture<CreateTermComponent>;
  // let mockFrameworkService: jasmine.SpyObj<FrameworkService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CreateTermComponent>>;
  let service : FrameworkService;
   beforeEach(async(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    // mockFrameworkService = jasmine.createSpyObj('FrameworkService', ['updateTerm', 'publishFramework', 'getUuid']);
    TestBed.configureTestingModule({
      declarations: [ CreateTermComponent ],
      imports: [
        MatDialogModule,
        BrowserDynamicTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatAutocompleteModule
      ],
      providers:[
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        { provide: FrameworkService, useClass: MockFrameworkService },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTermComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FrameworkService);
    component.data = {
      columnInfo: {
        children: []
      }
    };

    component.data = {
      frameworkId: 'mockFrameworkId',
      columnInfo: {
        category: 'mockCategory',
        code: 'mockCode',
        identifier: 'mockIdentifier',
        children: []
      }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.createTermForm).toBeDefined();
  });

  it('should mark form as invalid on submit with empty fields', () => {
    component.createTermForm.setValue({ name: '', description: '', area: '', type: '' });
    expect(component.createTermForm.valid).toBeFalsy();
  });

  it('should call saveTerm method on form submission for create', () => {
    spyOn(component, 'saveTerm');
    component.createTermForm.setValue({ name: 'Test Term', description: 'Description', area: 'area', type: 'type' });
    component.disableCreate = false;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    expect(component.saveTerm).toHaveBeenCalled();
  });

  it('should call updateTerm method on form submission for update', () => {
    spyOn(component, 'updateTerm');
    component.createTermForm.setValue({ name: 'Updated Term', description: 'Updated Description', area:'Updated Area', type: 'Updated Type' });
    component.disableCreate = true;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    expect(component.updateTerm).toHaveBeenCalled();
  });

  it('should render "Update" button when in update mode', async () => {
    component.disableCreate = true;
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const updateButton = await loader.getHarness(MatButtonHarness.with({ text: 'Update' }));
    expect(updateButton).toBeTruthy();
  });

  it('should call dialogClose method on "Cancel" button click', async () => {
    spyOn(component, 'dialogClose');
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const cancelButton = await loader.getHarness(MatButtonHarness.with({ text: 'Cancel' }));
    await cancelButton.click();
    fixture.detectChanges();
    expect(component.dialogClose).toHaveBeenCalled();
  });

  it('should set selectedTerm, patch values, and disable description', () => {
    const mockTerm = { value: { name: 'SelectedTerm', description: 'Description' } };
    component.onSelect(mockTerm);
    expect(component.selectedTerm).toEqual(mockTerm.value);
    expect(component.createTermForm.get('name').value).toBe(mockTerm.value.name);
    expect(component.createTermForm.get('description').value).toBe(mockTerm.value.description);
    expect(component.createTermForm.get('description').disabled).toBeTruthy();
    expect(component.disableCreate).toBeTruthy();
  });

  it('should set isTermExist to true if name already exists', () => {
    const mockExistingName = 'ExistingTerm';
    component.termLists = [{ name: mockExistingName }];
    component.createTermForm.get('name').setValue(mockExistingName);
    component.saveTerm();
    expect(component.isTermExist).toBeTruthy();
  });

 

  // it('should call createTerm method if the name does not exist and form is valid', () => {
  //   const mockNewName = 'NewTerm';
  //   component.termLists = [];
  //   component.createTermForm.get('name').setValue(mockNewName);
  //   spyOn(component.frameWorkService, 'createTerm').and.returnValue(of({ result: { node_id: ['someId'] } }));
  //   component.saveTerm();
  //   expect(component.isTermExist).toBeFalsy();
  //   expect(component.frameWorkService.createTerm).toHaveBeenCalled();
  // });

  it('should not set isTermExist if the name does not exist', () => {
    const mockInvalidName = '';
    component.termLists = [];
    component.createTermForm.get('name').setValue(mockInvalidName);
    component.saveTerm();
    expect(component.isTermExist).toBeFalsy();
  });

  it('_filter should filter termLists based on search text', () => {
    component.termLists = [
      { name: 'Term1' },
      { name: 'Term2' },
      { name: 'AnotherTerm' },
    ];
    const result = (component as any)._filter('Term');
    expect(result).toEqual([
      { name: 'Term1' },
      { name: 'Term2' },
      { name: 'AnotherTerm' },
    ]);
  });

  it('should update selectedTerm and form values when a term is selected', () => {
    const mockTerm = { value: { name: 'SelectedTerm', description: 'Description' } };
    component.onSelect(mockTerm);
    expect(component.selectedTerm).toEqual(mockTerm.value);
    expect(component.createTermForm.get('name').value).toBe(mockTerm.value.name);
    expect(component.createTermForm.get('description').value).toBe(mockTerm.value.description);
    expect(component.createTermForm.get('description').disabled).toBeTruthy();
    expect(component.disableCreate).toBeTruthy();
  });

  it('should update selectedTerm and form values when a different term is selected', () => {
    const existingSelectedTerm = { name: 'PreviousTerm', description: 'PreviousDescription' };
    component.selectedTerm = existingSelectedTerm;
    const newTerm = { value: { name: 'NewTerm', description: 'NewDescription' } };
    component.onSelect(newTerm);
    expect(component.selectedTerm).toEqual(newTerm.value);
    expect(component.createTermForm.get('name').value).toBe(newTerm.value.name);
    expect(component.createTermForm.get('description').value).toBe(newTerm.value.description);
    expect(component.createTermForm.get('description').disabled).toBeTruthy();
    expect(component.disableCreate).toBeTruthy();
  });

  // it('should handle createTerm success', fakeAsync(() => {
  //   const createTermResponse = { result: { node_id: ['someId'] } };
  //   mockFrameworkService.createTerm.and.returnValue(of(createTermResponse));
  //   mockFrameworkService.getUuid.and.returnValue(of('some-uuid'));
  //   component.createTermForm.setValue({ name: 'Test Term', description: 'Description' });
  //   component.disableCreate = false;
  //   component.saveTerm();
  //   tick();
  //   expect(component.selectedTerm['identifier']).toEqual('someId');
  //   expect(component['dialogRef'].close).toHaveBeenCalledWith({ term: component.selectedTerm, created: true });
  //   expect(component.updateTerm).toHaveBeenCalled();
  // }));
  
  it('should close the dialog on dialogClose', () => {
    const mockTerm = { term: 'sampleTerm', created: true };
    const publishFrameworkSpy = spyOn(service, 'publishFramework').and.returnValue(of({}));
    component.dialogClose(mockTerm);
    expect(publishFrameworkSpy).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(mockTerm);
  });
  
  
  // it('should update form elements on select', () =>{
  //   const term = {
  //     value: {
  //       name:'flooring measurements',
  //       description:'flooring measurements'
  //     }
  //   };
  //   component.onSelect(term);
  //   expect(component.disableCreate).toBeTruthy();
  // });

  it('should show alert if the term already exist', ()=> {
      component.termLists = [
        {name:'flooring', description:''},
        {name:'site', description:'site'}
      ];
      component.createTermForm.setValue({ name: 'flooring', description: 'Description', area: 'Functional', type: 'Visual Design' });
      component.saveTerm();
      expect(component.isTermExist).toBeTruthy();
  });

  it('should show alert if the term already exist', ()=> {
    service.selectionList = list;
    const frameWorkServiceSpy =  spyOn(service, 'createTerm').and.returnValue(of({
      result:{
        node_id:['1']
      }}));
    component.termLists = [
      {name:'floor', description:''},
      {name:'site', description:'site'}
    ];
    component.createTermForm.setValue({ name: 'flooring', description: 'Description', area: 'Functional', type: 'Visual Design' });
    component.saveTerm();
    expect(frameWorkServiceSpy).toHaveBeenCalled();
});


});
