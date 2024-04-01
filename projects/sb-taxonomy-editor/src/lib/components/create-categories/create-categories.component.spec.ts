import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoriesComponent } from './create-categories.component';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

xdescribe('CreateCategoriesComponent', () => {
  let component: CreateCategoriesComponent;
  let fixture: ComponentFixture<CreateCategoriesComponent>;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoriesComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fb = new FormBuilder();
    component = new CreateCategoriesComponent(fb);

    component['createCategoriesForm'] = fb.group({
      categories: fb.array([])
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit updateCategory event', () => {
    spyOn(component.updateCategory, 'emit');
    const categories = [{ name: 'Category 1' }, { name: 'Category 2' }];
    component.emitCategory({ target: { value: categories } });
    expect(component.updateCategory.emit).toHaveBeenCalledWith(categories);
  });

  it('should emit removeCategories event', () => {
    spyOn(component.removeCategories, 'emit');
    component.removeCategory(0);
    expect(component.removeCategories.emit).toHaveBeenCalledWith(0);
  });

  it('should initialize createCategoriesForm with empty categories', () => {
    expect(component.createCategoriesForm.get('categories').value.length).toBe(0);
  });

  it('should initialize createCategoriesForm and call initCategoryForm if taxonomyInfo exists', () => {
    const taxonomyInfo = [{ name: 'Category 1' }, { name: 'Category 2' }];
    component.taxonomyInfo = taxonomyInfo;
    spyOn(component, 'initCategoryForm');
    component.ngOnInit();
    expect(component.initCategoryForm).toHaveBeenCalled();
  });

  it('should initialize createCategoriesForm and call addCategory if taxonomyInfo does not exist', () => {
    spyOn(component, 'addCategory');
    component.ngOnInit();
    expect(component.addCategory).toHaveBeenCalled();
  });

  it('should return FormArray for categories', () => {
    expect(component.categories()).toEqual(jasmine.any(FormArray));
  });

  it('should create a new FormGroup for categories', () => {
    const newCategoryForm: FormGroup = component.newCategories();
    expect(newCategoryForm).toEqual(jasmine.any(FormGroup));
    expect(newCategoryForm.get('name').value).toEqual('');
  });

  it('should add a new category', () => {
    component['createCategoriesForm'] = fb.group({
      categories: fb.array([])
    });
  
    component.addCategory();
    expect(component.categories().length).toBe(1);
  });

  it('should remove a category', () => {
    component.addCategory();
    component.removeCategory(0);
    expect(component.categories().length).toBe(0);
  });

  it('should initialize categories from taxonomyInfo', () => {
    const taxonomyInfo = [{ name: 'Category 1' }, { name: 'Category 2' }];
    component.taxonomyInfo = taxonomyInfo;
    component.initCategoryForm();
    expect(component.categories().length).toBe(taxonomyInfo.length);
  });  

  it('should emit category updates on emitCategory', () => {
    spyOn(component.updateCategory, 'emit');
    const event = { target: { value: 'Category 1' } };
    component.emitCategory(event);
    expect(component.updateCategory.emit).toHaveBeenCalledWith(event.target.value);
  });

});
