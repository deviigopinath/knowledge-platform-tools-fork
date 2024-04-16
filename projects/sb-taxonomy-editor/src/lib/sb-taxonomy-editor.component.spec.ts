import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbTaxonomyEditorComponent } from './sb-taxonomy-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { FrameworkService } from './services/framework.service';
import { MockFrameworkService } from './components/taxonomy-view/taxonomy-view.component.stub';


describe('SbTaxonomyEditorComponent', () => {
  let component: SbTaxonomyEditorComponent;
  let fixture: ComponentFixture<SbTaxonomyEditorComponent>;
  let frmService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SbTaxonomyEditorComponent ],
      imports: [HttpClientModule],
      providers: [
        { provide: FrameworkService, useClass:MockFrameworkService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SbTaxonomyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    frmService = TestBed.inject(FrameworkService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set framework configs and environment', () => {
     const updateSpy = spyOn(frmService, 'updateEnvironment');
     const setConfigSpy = spyOn(frmService, 'setConfig');
     component.ngOnInit();
     expect(updateSpy).toHaveBeenCalled();
     expect(setConfigSpy).toHaveBeenCalled();
  });


});
