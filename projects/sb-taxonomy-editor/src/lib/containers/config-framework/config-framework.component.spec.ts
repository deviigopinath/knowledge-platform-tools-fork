import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigFrameworkComponent } from './config-framework.component';
import { FrameworkService } from '../../services/framework.service';
import { of } from 'rxjs';

describe('ConfigFrameworkComponent', () => {
  let component: ConfigFrameworkComponent;
  let fixture: ComponentFixture<ConfigFrameworkComponent>;
  let frameworkService: jasmine.SpyObj<FrameworkService>;

  beforeEach(async () => {
    const frameworkServiceSpy = jasmine.createSpyObj('FrameworkService', ['getFrameworkInfo']);

    await TestBed.configureTestingModule({
      declarations: [ConfigFrameworkComponent],
      providers: [{ provide: FrameworkService, useValue: frameworkServiceSpy }]
    })
    .compileComponents();

    frameworkService = TestBed.inject(FrameworkService) as jasmine.SpyObj<FrameworkService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch framework info on initialization', () => {
    const frameworkInfo = { result: { framework: { categories: [] } } };
    frameworkService.getFrameworkInfo.and.returnValue(of(frameworkInfo));

    component.ngOnInit();

    expect(frameworkService.getFrameworkInfo).toHaveBeenCalled();
    expect(component.frameworkCategories).toEqual([]);
  });

  it('should update category representations', () => {
    component.tempCategoryRepresentaions = [];
    component.categoriesRepresentations = [];

    component.updateCategory('Sample Category');

    expect(component.tempCategoryRepresentaions.length).toBe(1);
    expect(component.categoriesRepresentations.length).toBe(1);
    expect(component.tempCategoryRepresentaions[0].name).toBe('Sample Category');
    expect(component.categoriesRepresentations[0].name).toBe('Sample Category');
  });

  it('should remove elements with the class name "leader-line"', () => {
    const mockElements = [
      document.createElement('div')
    ];
    mockElements.forEach(element => element.classList.add('leader-line'));
    mockElements.forEach(element => document.body.appendChild(element));
  
    component.removeOldLine();
    const remainingElements = document.getElementsByClassName('leader-line');
    expect(remainingElements.length).toBe(0);
  });
  
  it('should not remove elements if none with class name "leader-line" are present', () => {
    component.removeOldLine();

    const remainingElements = document.getElementsByClassName('leader-line');
    expect(remainingElements.length).toBe(0);
  });

  it('should remove category at specified index', () => {
    component.categoriesRepresentations = [
      { name: 'Category 1' },
      { name: 'Category 2' },
      { name: 'Category 3' }
    ];
    const indexToRemove = 1;

    component.removeCategory(indexToRemove);

    expect(component.categoriesRepresentations.length).toBe(2);
    expect(component.categoriesRepresentations.map(cat => cat.name)).toEqual(['Category 1', 'Category 3']);
  });

  it('should update category representations', () => {
    component.categoriesRepresentations = [
      { name: 'Category 1' },
      { name: 'Category 2' },
      { name: 'Category 3' }
    ];

    component.removeCategory(1);

    expect(component.tempCategoryRepresentaions.length).toBe(2);
    expect(component.tempCategoryRepresentaions.map(cat => cat.name)).toEqual(['Category 1', 'Category 3']);
  });

  it('should change the position of categories', () => {
    component.tempCategoryRepresentaions = [
      { name: 'Category 1' },
      { name: 'Category 2' },
      { name: 'Category 3' }
    ];

    const event = { prev: 0, cur: 2 };

    component.changePosition(event);


    expect(component.tempCategoryRepresentaions.length).toBe(3);
    expect(component.tempCategoryRepresentaions.map(cat => cat.name)).toEqual(['Category 3', 'Category 2', 'Category 1']);
    expect(component.categoriesRepresentations.length).toBe(3); 
  });

  it('should update category representations after changing position', () => {
    component.tempCategoryRepresentaions = [
      { name: 'Category 1' },
      { name: 'Category 2' },
      { name: 'Category 3' }
    ]

    const event = { prev: 0, cur: 2 }; 
    component.changePosition(event);

    expect(component.tempCategoryRepresentaions.length).toBe(3);
    expect(component.tempCategoryRepresentaions.map(cat => cat.name)).toEqual(['Category 3', 'Category 2', 'Category 1']);
  });

});
