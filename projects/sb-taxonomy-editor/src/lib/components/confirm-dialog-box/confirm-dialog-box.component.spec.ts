import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogBoxComponent } from './confirm-dialog-box.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClientModule } from '@angular/common/http';
import { FrameworkService } from '../../services/framework.service';

describe('ConfirmDialogBoxComponent', () => {
  let component: ConfirmDialogBoxComponent;
  let fixture: ComponentFixture<ConfirmDialogBoxComponent>;
  let frmService: FrameworkService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogBoxComponent ],
      imports: [
        MatDialogModule,
        BrowserDynamicTestingModule,
        HttpClientModule
      ],
      providers:[
        {provide: MatDialogRef, useValue: {close:()=>{}}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        FrameworkService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm before removing term from association', () => {
      const frmService = TestBed.inject(FrameworkService);
      const dialogSpy = spyOn(component.dialogRef, 'close');
      const removeAssociationspy = spyOn(frmService, 'isTermExistRemove');
      component.removeAssociation();
      expect(removeAssociationspy).toHaveBeenCalled();
      expect(dialogSpy).toHaveBeenCalled();
  });

});
