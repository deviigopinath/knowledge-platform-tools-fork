import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectorComponent } from './connector.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';


describe('ConnectorComponent', () => {
  let component: ConnectorComponent;
  let fixture: ComponentFixture<ConnectorComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectorComponent ],
      imports:[
        MatDialogModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers:[
        {provide: MatDialogRef, useValue: {close:()=>{}}},
        {provide: MAT_DIALOG_DATA, useValue: []},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save connection', () => {
    const dialogSpy = spyOn(component.dialogRef, 'close')
      component.connectorForm.setValue({
        endpoint:'https://compass-dev.tarento.com',
        token:'eypynmgs',
        frameworkName:'fracing_fw'
      });
      component.saveConnection();
      expect(dialogSpy).toHaveBeenCalled();
  });


  it('should clear the connection', () => {
    const resetSpy = spyOn(component.connectorForm, 'reset');  
    component.clear();
    expect(resetSpy).toHaveBeenCalled();
  });

});
