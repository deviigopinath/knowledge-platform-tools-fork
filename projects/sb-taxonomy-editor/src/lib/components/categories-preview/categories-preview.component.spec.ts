import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CategoriesPreviewComponent } from './categories-preview.component';

xdescribe('CategoriesPreviewComponent', () => {
  let component: CategoriesPreviewComponent;
  let fixture: ComponentFixture<CategoriesPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesPreviewComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call drawLine after 200ms delay when data changes', fakeAsync(() => {
    spyOn(component, 'drawLine');
    component.ngOnChanges();
    tick(200);
    expect(component.drawLine).toHaveBeenCalled();
  }));

  it('should draw lines between connected terms', () => {
    const testData = [
      {
        terms: [
          { domId: 'term1', connected: true, parent: 'parent1' },
          { domId: 'term2', connected: true, parent: 'parent2' }
        ]
      }
    ];
    component.data = testData;
    component.drawLine();

    expect(component.lineRef.length).toBe(2);
    component.lineRef.forEach(line => {
      expect(line).toBeTruthy();
    });

  });

});
