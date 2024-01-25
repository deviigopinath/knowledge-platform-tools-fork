import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameworkService } from './framework.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NSFramework } from '../models/framework.model';
import { taxonomyConfig } from '../../../../../src/assets/config';
import { LocalConnectionService } from './local-connection.service';

describe('FrameworkService', () => {
  let service: FrameworkService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.inject(FrameworkService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // service = new FrameworkService(httpClientSpy);
  });

  it('should be created', () => {
        expect(service).toBeTruthy();
  });

  it('should get framework details', () => {
//    httpClientSpy.get.and.returnValue(of(serviceRes));
    service.environment = {
      frameworkName: 'fracing_fw'
    };
    service.rootConfig = rootConfig;
    service.getFrameworkInfo().subscribe(res => {
      expect(res.result.framework.code).toEqual('fracing_fw');
    });
        const url =  `/api/framework/v1/read/fracing_fw`;
        const req =  httpTestingController.expectOne(url);
        expect(req.request.method).toEqual('GET');
        req.flush(serviceRes);
  });

 

  it('should create term', () => {
    service.environment = {
      frameworkName: 'fracing_fw'
    };
    service.createTerm('fracing_fw', 'taxonomyCategory1', {}).subscribe(res => {});
    const url =  `/api/framework/v1/term/create?framework=fracing_fw&category=taxonomyCategory1`;
     const req =  httpTestingController.expectOne(url);
     expect(req.request.method).toEqual('POST');
     req.flush('res');
  });

  it('should Update term', () => {
    service.environment = {
      frameworkName: 'fracing_fw'
    };
    service.updateTerm('fracing_fw', 'taxonomyCategory1', 'tracCode', {}).subscribe(res => {});
    const url =  `/api/framework/v1/term/update/tracCode?framework=fracing_fw&category=taxonomyCategory1`;
    const req =  httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('PATCH');
    req.flush('res');
  });


  it('should publish the Framework', () => {
    service.environment = {
      frameworkName: 'fracing_fw'
    };
    service.publishFramework().subscribe(res => {});
    const url =  `/api/framework/v1/publish/${service.environment.frameworkName}`;
    const req =  httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush('res');
  });

  it('should get UUID', () => {
     expect(service.getUuid().length).toBeGreaterThan(0);
  });

  it('should update Environment variable', () => {
    const envData = {
      url: 'https://compass-dev.tarento.com/',
      authToken : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0WEFsdFpGMFFhc1JDYlFnVXB4b2RvU2tLRUZyWmdpdCJ9',
      frameworkName: 'fracing_fw',
      isApprovalRequired: false
    }
    service.updateEnvironment(envData);
    expect(service.environment.frameworkName).toEqual('fracing_fw');
  });

  it('should get Environment variable', () => {
    const envData = {
      url: 'https://compass-dev.tarento.com/',
      authToken : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0WEFsdFpGMFFhc1JDYlFnVXB4b2RvU2tLRUZyWmdpdCJ9',
      frameworkName: 'fracing_fw',
      isApprovalRequired: false
    }
    service.updateEnvironment(envData);
    expect(service.getEnviroment().frameworkName).toEqual('fracing_fw');
  });

  it('should get framework Id', () => {
    service.frameworkId = 'fracing_fw';
    expect(service.getFrameworkId()).toEqual('fracing_fw');
  });

  it('should next category', () => {
    const expValue = {
      code: "taxonomyCategory2",
      description : "Roles of the work order",
      identifier: "fracing_fw_taxonomycategory2",
      index:2,
      name: "Roles",
      status: "Live",
      translations: null
    };
    service.rootConfig = rootConfig;
    service.formateData(serviceRes);
    expect(service.getNextCategory('taxonomyCategory1').identifier).toEqual(expValue.identifier);
  });

  // it('should next category as NULL', () => {
  //   const expValue = {
  //     code: "taxonomyCategory5",
  //     description : "Roles of the work order",
  //     identifier: "fracing_fw_taxonomycategory5",
  //     index:2,
  //     name: "Roles",
  //     status: "Live",
  //     translations: null
  //   };
  //   service.rootConfig = rootConfig;
  //   // service.categoriesHash.getValue.
  //   service.formateData(serviceRes);
  //   expect(service.getNextCategory('taxonomyCategory6')).toBeNull();
  // });

  it('should prev category', () => {
    const expValue = {
      code: "taxonomyCategory2",
      description : "Roles of the work order",
      identifier: "fracing_fw_taxonomycategory2",
      index:2,
      name: "Roles",
      status: "Live",
      translations: null
    };
    service.rootConfig = rootConfig;
    service.formateData(serviceRes);
    expect(service.getPreviousCategory('taxonomyCategory3').identifier).toBe(expValue.identifier);
  });

  it('should childClick selection', () => {
    const expValue = {
      code: "taxonomyCategory2",
      description : "Roles of the work order",
      identifier: "fracing_fw_taxonomycategory2",
      index:2,
      name: "Roles",
      status: "Live",
      translations: null
    };
    service.rootConfig = rootConfig;
    service.formateData(serviceRes);
    expect(service.getPreviousCategory('taxonomyCategory3').identifier).toBe(expValue.identifier);
  });



  it('should child click', () => {
    // const currentSelectionSpy = spyOn(service, 'currentSelection')
    const event= { type:'child', data:[]}
    service.childClick(event)

    service.currentSelection.subscribe(res => {
      expect(res.data).toEqual([]);
    });
  });


  it('should reset all objects/taxonomy', () => {
   
    service.resetAll();
    service.categoriesHash.subscribe(res => {
      expect(res).toEqual([]);
    });
  });

 
  it('should reset all objects/taxonomy', () => {
      expect( service.isLastColumn('taxonomyCategory5')).toEqual(true);
  });

  it('should set term', () => {
    service.setTerm = 'res';
    service.termSubject.subscribe(res => {
      expect(res).toEqual('res');
    });
    });



  it('should get Terms Parent term', () => {
    service.setTerm = 'res';
    expect(service.getLocalTermsByCategory('taxonomyCategory5')).toEqual([])
  });  

  it('should revome older connecting line', () => {
    const orderLine = document.createElement('div');
    orderLine.classList.add('leader-line');
    service.removeOldLine();
    const ele =  document.querySelector('.leader-line') || [];
    expect(ele).toEqual([])
  }); 

  it('should set root config', () => {
    service.setConfig(rootConfig);
    expect(service.rootConfig.length).toBeGreaterThan(1);
  }); 

  it('should get root config', () => {
    // const frameworkConfig = 
    //   {
    //     frameworkId :"fracing_fw",
    //     config:rootConfig
    //   }
    service.frameworkId = 'fracing_fw';
    service.setConfig(taxonomyConfig);
    expect(service.getConfig('taxonomyCategory1').color).toEqual('#1d2327');
  }); 


  it('should be able to remove existing term', () => {
    const updateTermSpy = spyOn(service, 'updateTerm').and.returnValue(of({res:'res'}));
    const publishFrameworkSpy = spyOn(service, 'publishFramework').and.returnValue(of({res:'res'}));
    service.environment = {
      frameworkName: 'fracing_fw'
    }
    service.selectionList = selctionList;
    service.isTermExistRemove('fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687');
    expect(updateTermSpy).toHaveBeenCalled();
    service.updateTerm('fracing_fw', 'taxonomyCategory1','positions_c', {}).subscribe(res => {
      expect(publishFrameworkSpy).toHaveBeenCalled();
    })
  }); 

 

  // it('should get parent term ', () => {
  //   const expValue = {
  //     code: "taxonomyCategory4",
  //     description : "Roles of the work order",
  //     identifier: "fracing_fw_taxonomycategory4",
  //     index:2,
  //     name: "Roles",
  //     status: 'Live',
  //     translations: null,
  //     selected:false,
  //     children:[],
  //     category:'taxonomyCategory4',
  //     associations:'',
  //     config:''
  //   };
  //   service.selectionList = selctionList
  //   service.rootConfig = rootConfig;
  //   service.formateData(serviceRes);
  //   service.getPreviousCategory('taxonomyCategory3')
  //   expect(service.getParentTerm('taxonomyCategory4').identifier).toEqual(expValue.identifier);
  // });


















  const  rootConfig = [
        {
        frameworkId:'tarento_fw',
         config:[
            {   
                "index": 1,
                "category": "taxonomyCategory1",
                "icon": "settings",
                "color": "#1d2327"
            },
            {   
                "index": 2,
                "category": "taxonomyCategory2",
                "icon": "extension",
                "color": "#541675"
            },
            {   
                "index": 3,
                "category": "taxonomyCategory3",
                "icon": "bar_chart",
                "color": "#9a6c80"
            },
            {   
                "index": 4,
                "category": "taxonomyCategory4",
                "icon": "account_box",
                "color": "#d8666a"
            },
            {   
                "index": 5,
                "category": "taxonomyCategory5",
                "icon": "account_box",
                "color": "#d8666a"
            }
        ]
        },
        {
                "frameworkId" :"default",
                "config" : [
                    {   
                        "index": 1,
                        "category": "taxonomyCategory1",
                        "icon": "settings",
                        "color": "#1d2327"
                    },
                    {   
                        "index": 2,
                        "category": "taxonomyCategory2",
                        "icon": "extension",
                        "color": "#541675"
                    },
                    {   
                        "index": 3,
                        "category": "taxonomyCategory3",
                        "icon": "bar_chart",
                        "color": "#9a6c80"
                    },
                    {   
                        "index": 4,
                        "category": "taxonomyCategory4",
                        "icon": "account_box",
                        "color": "#d8666a"
                    },
                    {   
                        "index": 5,
                        "category": "taxonomyCategory5",
                        "icon": "account_box",
                        "color": "#d8666a"
                    }
        
                ]
            }

    ]
    

  let serviceRes = {
    "result": {
        "framework": {
            "identifier": "fracing_fw",
            "code": "fracing_fw",
            "name": "FRACing Framework",
            "description": "Fracing Framework",
            "categories": [
                {
                    "identifier": "fracing_fw_taxonomycategory1",
                    "code": "taxonomyCategory1",
                    "terms": [
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory2_c1122108-e228-4eff-a48c-83f766261182",
                                    "code": "c1122108-e228-4eff-a48c-83f766261182",
                                    "translations": null,
                                    "name": "Floor Supervisor",
                                    "description": "Floor Supervision",
                                    "index": 0,
                                    "category": "taxonomyCategory2",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "translations": null,
                                    "name": "Survey",
                                    "description": "Survey of site",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory1_positions_a",
                            "code": "positions_a",
                            "translations": null,
                            "name": "Senior Engineer",
                            "description": "Senior Engineer responsible for major site activities",
                            "index": 1,
                            "category": "taxonomyCategory1",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                                    "code": "competencies_b",
                                    "translations": null,
                                    "name": "Coverage and surveillance",
                                    "description": "In a area, how to plan the surveillance",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory2_e092295b-1e31-4389-8981-1191513687d2",
                                    "code": "e092295b-1e31-4389-8981-1191513687d2",
                                    "translations": null,
                                    "name": "Site Supervisor",
                                    "description": "Supervision of Sites",
                                    "index": 0,
                                    "category": "taxonomyCategory2",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_activities_d",
                                    "code": "activities_d",
                                    "translations": null,
                                    "name": "Site Earthing",
                                    "description": "Ground digging activity of the site for further builds",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory1_positions_b",
                            "code": "positions_b",
                            "translations": null,
                            "name": "Junior Engineer",
                            "description": "Junior Engineer responsible for major site activities",
                            "index": 2,
                            "category": "taxonomyCategory1",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_a",
                                    "code": "competencies_a",
                                    "translations": null,
                                    "name": "Floor Planning and Mapping",
                                    "description": "Creating plans for the floor and layout blueprints",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_b675af5f-aeaa-4414-85ae-765be1dacb08",
                                    "code": "b675af5f-aeaa-4414-85ae-765be1dacb08",
                                    "translations": null,
                                    "name": "Land Evaluation",
                                    "description": "Evaluation of the Land",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory2_roles_a",
                                    "code": "roles_a",
                                    "translations": null,
                                    "name": "Area Manager",
                                    "description": "Vice President acts as Area Manager for the work site",
                                    "index": 0,
                                    "category": "taxonomyCategory2",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "translations": null,
                                    "name": "Survey",
                                    "description": "Survey of site",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                                    "code": "6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                                    "translations": null,
                                    "name": "Building Assessment",
                                    "description": "Building Assessment",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_f",
                                    "code": "competencies_f",
                                    "translations": null,
                                    "name": "Land Inspection Blueprint",
                                    "description": "Blueprint of land inspection",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory2_roles_c",
                                    "code": "roles_c",
                                    "translations": null,
                                    "name": "Site Manager",
                                    "description": "Vice President acts as Site Manager for the work site",
                                    "index": 0,
                                    "category": "taxonomyCategory2",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory2_roles_b",
                                    "code": "roles_b",
                                    "translations": null,
                                    "name": "Floor Manager",
                                    "description": "Vice President acts as Floor Manager for the work site",
                                    "index": 0,
                                    "category": "taxonomyCategory2",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "translations": null,
                                    "name": "Level 3",
                                    "description": "Level 3 of Assessment Documentations",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                                    "code": "competencies_b",
                                    "translations": null,
                                    "name": "Coverage and surveillance",
                                    "description": "In a area, how to plan the surveillance",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_787bb123-3926-4226-a866-1a51d7ae98b3",
                                    "code": "787bb123-3926-4226-a866-1a51d7ae98b3",
                                    "translations": null,
                                    "name": "Floor Inspection",
                                    "description": "Floor Inspection",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory1_positions_c",
                            "code": "positions_c",
                            "translations": null,
                            "name": "Vice President",
                            "description": "Vice President responsible for heading the site activities",
                            "index": 3,
                            "category": "taxonomyCategory1",
                            "status": "Live"
                        }
                    ],
                    "translations": null,
                    "name": "Positions",
                    "description": "Position of the work order",
                    "index": 1,
                    "status": "Live"
                },
                {
                    "identifier": "fracing_fw_taxonomycategory2",
                    "code": "taxonomyCategory2",
                    "terms": [
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_a",
                                    "code": "competencies_a",
                                    "translations": null,
                                    "name": "Floor Planning and Mapping",
                                    "description": "Creating plans for the floor and layout blueprints",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_62d9c3b0-1d95-4c94-90de-d1034844a3be",
                                    "code": "62d9c3b0-1d95-4c94-90de-d1034844a3be",
                                    "translations": null,
                                    "name": "Building Area Approval",
                                    "description": "Approval of the Building Area - Commercial and Residential",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "translations": null,
                                    "name": "Survey",
                                    "description": "Survey of site",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_b675af5f-aeaa-4414-85ae-765be1dacb08",
                                    "code": "b675af5f-aeaa-4414-85ae-765be1dacb08",
                                    "translations": null,
                                    "name": "Land Evaluation",
                                    "description": "Evaluation of the Land",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "translations": null,
                                    "name": "Level 3",
                                    "description": "Level 3 of Assessment Documentations",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_activities_b",
                                    "code": "activities_b",
                                    "translations": null,
                                    "name": "Zonal Area Approval",
                                    "description": "Approvals for the Zonal Area Management",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_activities_a",
                                    "code": "activities_a",
                                    "translations": null,
                                    "name": "Area Assessment",
                                    "description": " Assessment of the area level coverage",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                                    "code": "competencies_b",
                                    "translations": null,
                                    "name": "Coverage and surveillance",
                                    "description": "In a area, how to plan the surveillance",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_787bb123-3926-4226-a866-1a51d7ae98b3",
                                    "code": "787bb123-3926-4226-a866-1a51d7ae98b3",
                                    "translations": null,
                                    "name": "Floor Inspection",
                                    "description": "Floor Inspection",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory2_roles_a",
                            "code": "roles_a",
                            "translations": null,
                            "name": "Area Manager",
                            "description": "Vice President acts as Area Manager for the work site",
                            "index": 1,
                            "category": "taxonomyCategory2",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_activities_e",
                                    "code": "activities_e",
                                    "translations": null,
                                    "name": "Floor Map Creation",
                                    "description": "Creating the floor map for the electric and water orders",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory2_roles_b",
                            "code": "roles_b",
                            "translations": null,
                            "name": "Floor Manager",
                            "description": "Vice President acts as Floor Manager for the work site",
                            "index": 2,
                            "category": "taxonomyCategory2",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_f",
                                    "code": "competencies_f",
                                    "translations": null,
                                    "name": "Land Inspection Blueprint",
                                    "description": "Blueprint of land inspection",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_activities_d",
                                    "code": "activities_d",
                                    "translations": null,
                                    "name": "Site Earthing",
                                    "description": "Ground digging activity of the site for further builds",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                                    "code": "competencies_b",
                                    "translations": null,
                                    "name": "Coverage and surveillance",
                                    "description": "In a area, how to plan the surveillance",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_activities_c",
                                    "code": "activities_c",
                                    "translations": null,
                                    "name": "Site Inspection",
                                    "description": "Inspection of the site area and plan",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                                    "code": "6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                                    "translations": null,
                                    "name": "Building Assessment",
                                    "description": "Building Assessment",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "translations": null,
                                    "name": "Level 3",
                                    "description": "Level 3 of Assessment Documentations",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory2_roles_c",
                            "code": "roles_c",
                            "translations": null,
                            "name": "Site Manager",
                            "description": "Vice President acts as Site Manager for the work site",
                            "index": 3,
                            "category": "taxonomyCategory2",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                                    "code": "competencies_b",
                                    "translations": null,
                                    "name": "Coverage and surveillance",
                                    "description": "In a area, how to plan the surveillance",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_activities_c",
                                    "code": "activities_c",
                                    "translations": null,
                                    "name": "Site Inspection",
                                    "description": "Inspection of the site area and plan",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_activities_b",
                                    "code": "activities_b",
                                    "translations": null,
                                    "name": "Zonal Area Approval",
                                    "description": "Approvals for the Zonal Area Management",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_activities_d",
                                    "code": "activities_d",
                                    "translations": null,
                                    "name": "Site Earthing",
                                    "description": "Ground digging activity of the site for further builds",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory2_e092295b-1e31-4389-8981-1191513687d2",
                            "code": "e092295b-1e31-4389-8981-1191513687d2",
                            "translations": null,
                            "name": "Site Supervisor",
                            "description": "Supervision of Sites",
                            "index": 4,
                            "category": "taxonomyCategory2",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_787bb123-3926-4226-a866-1a51d7ae98b3",
                                    "code": "787bb123-3926-4226-a866-1a51d7ae98b3",
                                    "translations": null,
                                    "name": "Floor Inspection",
                                    "description": "Floor Inspection",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_242cd118-11ec-4ed7-b5b3-8cf0caaff109",
                                    "code": "242cd118-11ec-4ed7-b5b3-8cf0caaff109",
                                    "translations": null,
                                    "name": "Floor inspection Blueprint",
                                    "description": "Blueprint for Floor Inspection",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory2_c1122108-e228-4eff-a48c-83f766261182",
                            "code": "c1122108-e228-4eff-a48c-83f766261182",
                            "translations": null,
                            "name": "Floor Supervisor",
                            "description": "Floor Supervision",
                            "index": 5,
                            "category": "taxonomyCategory2",
                            "status": "Live"
                        }
                    ],
                    "translations": null,
                    "name": "Roles",
                    "description": "Roles of the work order",
                    "index": 2,
                    "status": "Live"
                },
                {
                    "identifier": "fracing_fw_taxonomycategory3",
                    "code": "taxonomyCategory3",
                    "terms": [
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_d",
                                    "code": "competencies_d",
                                    "translations": null,
                                    "name": "Assessment Documentations",
                                    "description": "Documentation of assessment of land",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                                    "code": "competencies_b",
                                    "translations": null,
                                    "name": "Coverage and surveillance",
                                    "description": "In a area, how to plan the surveillance",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "translations": null,
                                    "name": "Survey",
                                    "description": "Survey of site",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "translations": null,
                                    "name": "Level 3",
                                    "description": "Level 3 of Assessment Documentations",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory3_activities_a",
                            "code": "activities_a",
                            "translations": null,
                            "name": "Area Assessment",
                            "description": " Assessment of the area level coverage",
                            "index": 1,
                            "category": "taxonomyCategory3",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_c",
                                    "code": "competencies_c",
                                    "translations": null,
                                    "name": "Earth core concepts",
                                    "description": "Concepts of earth core cutting and digging",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_e",
                                    "code": "competencies_e",
                                    "translations": null,
                                    "name": "Approval Hierarchy Planning",
                                    "description": "Approval hierarchy planning",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory3_activities_b",
                            "code": "activities_b",
                            "translations": null,
                            "name": "Zonal Area Approval",
                            "description": "Approvals for the Zonal Area Management",
                            "index": 2,
                            "category": "taxonomyCategory3",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_f",
                                    "code": "competencies_f",
                                    "translations": null,
                                    "name": "Land Inspection Blueprint",
                                    "description": "Blueprint of land inspection",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory3_activities_c",
                            "code": "activities_c",
                            "translations": null,
                            "name": "Site Inspection",
                            "description": "Inspection of the site area and plan",
                            "index": 3,
                            "category": "taxonomyCategory3",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "translations": null,
                                    "name": "Level 3",
                                    "description": "Level 3 of Assessment Documentations",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_f",
                                    "code": "competencies_f",
                                    "translations": null,
                                    "name": "Land Inspection Blueprint",
                                    "description": "Blueprint of land inspection",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                                    "code": "competencies_b",
                                    "translations": null,
                                    "name": "Coverage and surveillance",
                                    "description": "In a area, how to plan the surveillance",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory3_activities_d",
                            "code": "activities_d",
                            "translations": null,
                            "name": "Site Earthing",
                            "description": "Ground digging activity of the site for further builds",
                            "index": 4,
                            "category": "taxonomyCategory3",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "translations": null,
                                    "name": "Survey",
                                    "description": "Survey of site",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_a",
                                    "code": "competencies_a",
                                    "translations": null,
                                    "name": "Floor Planning and Mapping",
                                    "description": "Creating plans for the floor and layout blueprints",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory3_activities_e",
                            "code": "activities_e",
                            "translations": null,
                            "name": "Floor Map Creation",
                            "description": "Creating the floor map for the electric and water orders",
                            "index": 5,
                            "category": "taxonomyCategory3",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                                    "code": "competencies_b",
                                    "translations": null,
                                    "name": "Coverage and surveillance",
                                    "description": "In a area, how to plan the surveillance",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory3_activities_f",
                            "code": "activities_f",
                            "translations": null,
                            "name": "Floor Coverage",
                            "description": "Creating the floor coverage plans for the CCTV",
                            "index": 6,
                            "category": "taxonomyCategory3",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_787bb123-3926-4226-a866-1a51d7ae98b3",
                                    "code": "787bb123-3926-4226-a866-1a51d7ae98b3",
                                    "translations": null,
                                    "name": "Floor Inspection",
                                    "description": "Floor Inspection",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory3_242cd118-11ec-4ed7-b5b3-8cf0caaff109",
                            "code": "242cd118-11ec-4ed7-b5b3-8cf0caaff109",
                            "translations": null,
                            "name": "Floor inspection Blueprint",
                            "description": "Blueprint for Floor Inspection",
                            "index": 7,
                            "category": "taxonomyCategory3",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                    "translations": null,
                                    "name": "Survey",
                                    "description": "Survey of site",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory4_787bb123-3926-4226-a866-1a51d7ae98b3",
                                    "code": "787bb123-3926-4226-a866-1a51d7ae98b3",
                                    "translations": null,
                                    "name": "Floor Inspection",
                                    "description": "Floor Inspection",
                                    "index": 0,
                                    "category": "taxonomyCategory4",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory3_62d9c3b0-1d95-4c94-90de-d1034844a3be",
                            "code": "62d9c3b0-1d95-4c94-90de-d1034844a3be",
                            "translations": null,
                            "name": "Building Area Approval",
                            "description": "Approval of the Building Area - Commercial and Residential",
                            "index": 8,
                            "category": "taxonomyCategory3",
                            "status": "Live"
                        },
                        {
                            "identifier": "fracing_fw_taxonomycategory3_6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                            "code": "6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                            "translations": null,
                            "name": "Building Assessment",
                            "description": "Building Assessment",
                            "index": 9,
                            "category": "taxonomyCategory3",
                            "status": "Live"
                        }
                    ],
                    "translations": null,
                    "name": "Activities",
                    "description": "Activities of the work order",
                    "index": 3,
                    "status": "Live"
                },
                {
                    "identifier": "fracing_fw_taxonomycategory4",
                    "code": "taxonomyCategory4",
                    "terms": [
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory4_competencies_a",
                            "code": "competencies_a",
                            "translations": null,
                            "name": "Floor Planning and Mapping",
                            "description": "Creating plans for the floor and layout blueprints",
                            "index": 1,
                            "category": "taxonomyCategory4",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "translations": null,
                                    "name": "Level 3",
                                    "description": "Level 3 of Assessment Documentations",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                            "code": "competencies_b",
                            "translations": null,
                            "name": "Coverage and surveillance",
                            "description": "In a area, how to plan the surveillance",
                            "index": 2,
                            "category": "taxonomyCategory4",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory4_competencies_c",
                            "code": "competencies_c",
                            "translations": null,
                            "name": "Earth core concepts",
                            "description": "Concepts of earth core cutting and digging",
                            "index": 3,
                            "category": "taxonomyCategory4",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                    "translations": null,
                                    "name": "Level 3",
                                    "description": "Level 3 of Assessment Documentations",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory4_competencies_d",
                            "code": "competencies_d",
                            "translations": null,
                            "name": "Assessment Documentations",
                            "description": "Documentation of assessment of land",
                            "index": 4,
                            "category": "taxonomyCategory4",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory4_competencies_e",
                            "code": "competencies_e",
                            "translations": null,
                            "name": "Approval Hierarchy Planning",
                            "description": "Approval hierarchy planning",
                            "index": 5,
                            "category": "taxonomyCategory4",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory4_competencies_f",
                            "code": "competencies_f",
                            "translations": null,
                            "name": "Land Inspection Blueprint",
                            "description": "Blueprint of land inspection",
                            "index": 6,
                            "category": "taxonomyCategory4",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                            "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                            "translations": null,
                            "name": "Survey",
                            "description": "Survey of site",
                            "index": 7,
                            "category": "taxonomyCategory4",
                            "status": "Live"
                        },
                        {
                            "associations": [
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                    "translations": null,
                                    "name": "Level 2",
                                    "description": "Level 2",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory3_activities_d",
                                    "code": "activities_d",
                                    "translations": null,
                                    "name": "Site Earthing",
                                    "description": "Ground digging activity of the site for further builds",
                                    "index": 0,
                                    "category": "taxonomyCategory3",
                                    "status": "Live"
                                },
                                {
                                    "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                    "code": "competencies_level_1",
                                    "translations": null,
                                    "name": "Level 1",
                                    "description": "Level 1",
                                    "index": 0,
                                    "category": "taxonomyCategory5",
                                    "status": "Live"
                                }
                            ],
                            "identifier": "fracing_fw_taxonomycategory4_787bb123-3926-4226-a866-1a51d7ae98b3",
                            "code": "787bb123-3926-4226-a866-1a51d7ae98b3",
                            "translations": null,
                            "name": "Floor Inspection",
                            "description": "Floor Inspection",
                            "index": 8,
                            "category": "taxonomyCategory4",
                            "status": "Live"
                        },
                        {
                            "identifier": "fracing_fw_taxonomycategory4_b675af5f-aeaa-4414-85ae-765be1dacb08",
                            "code": "b675af5f-aeaa-4414-85ae-765be1dacb08",
                            "translations": null,
                            "name": "Land Evaluation",
                            "description": "Evaluation of the Land",
                            "index": 9,
                            "category": "taxonomyCategory4",
                            "status": "Live"
                        }
                    ],
                    "translations": null,
                    "name": "Competencies",
                    "description": "Competencies of the work order",
                    "index": 4,
                    "status": "Live"
                },
                {
                    "identifier": "fracing_fw_taxonomycategory5",
                    "code": "taxonomyCategory5",
                    "terms": [
                        {
                            "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                            "code": "competencies_level_1",
                            "translations": null,
                            "name": "Level 1",
                            "description": "Level 1",
                            "index": 1,
                            "category": "taxonomyCategory5",
                            "status": "Live"
                        },
                        {
                            "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                            "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                            "translations": null,
                            "name": "Level 2",
                            "description": "Level 2",
                            "index": 2,
                            "category": "taxonomyCategory5",
                            "status": "Live"
                        },
                        {
                            "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                            "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                            "translations": null,
                            "name": "Level 3",
                            "description": "Level 3 of Assessment Documentations",
                            "index": 3,
                            "category": "taxonomyCategory5",
                            "status": "Live"
                        }
                    ],
                    "translations": null,
                    "name": "Competency Levels",
                    "description": "Competency Levels of the work order",
                    "index": 5,
                    "status": "Live"
                }
            ],
            "type": "K-12",
            "objectType": "Framework"
        }
    }
}
const status = 'Live'
let selctionList = new Map([
  [
      "taxonomyCategory1",
      {
          "associations": [
              {
                  "identifier": "fracing_fw_taxonomycategory4_competencies_a",
                  "code": "competencies_a",
                  "translations": null,
                  "name": "Floor Planning and Mapping",
                  "description": "Creating plans for the floor and layout blueprints",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_b675af5f-aeaa-4414-85ae-765be1dacb08",
                  "code": "b675af5f-aeaa-4414-85ae-765be1dacb08",
                  "translations": null,
                  "name": "Land Evaluation",
                  "description": "Evaluation of the Land",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory2_roles_a",
                  "code": "roles_a",
                  "translations": null,
                  "name": "Area Manager",
                  "description": "Vice President acts as Area Manager for the work site",
                  "index": 0,
                  "category": "taxonomyCategory2",
                  "status": "Live",
                  "selected": false,
                  "children": [
                      {
                          "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                          "code": "competencies_level_1",
                          "translations": null,
                          "name": "Level 1",
                          "description": "Level 1",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_competencies_a",
                          "code": "competencies_a",
                          "translations": null,
                          "name": "Floor Planning and Mapping",
                          "description": "Creating plans for the floor and layout blueprints",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_62d9c3b0-1d95-4c94-90de-d1034844a3be",
                          "code": "62d9c3b0-1d95-4c94-90de-d1034844a3be",
                          "translations": null,
                          "name": "Building Area Approval",
                          "description": "Approval of the Building Area - Commercial and Residential",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                          "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                          "translations": null,
                          "name": "Survey",
                          "description": "Survey of site",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_b675af5f-aeaa-4414-85ae-765be1dacb08",
                          "code": "b675af5f-aeaa-4414-85ae-765be1dacb08",
                          "translations": null,
                          "name": "Land Evaluation",
                          "description": "Evaluation of the Land",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "translations": null,
                          "name": "Level 3",
                          "description": "Level 3 of Assessment Documentations",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_activities_b",
                          "code": "activities_b",
                          "translations": null,
                          "name": "Zonal Area Approval",
                          "description": "Approvals for the Zonal Area Management",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_activities_a",
                          "code": "activities_a",
                          "translations": null,
                          "name": "Area Assessment",
                          "description": " Assessment of the area level coverage",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                          "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                          "translations": null,
                          "name": "Level 2",
                          "description": "Level 2",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                          "code": "competencies_b",
                          "translations": null,
                          "name": "Coverage and surveillance",
                          "description": "In a area, how to plan the surveillance",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_787bb123-3926-4226-a866-1a51d7ae98b3",
                          "code": "787bb123-3926-4226-a866-1a51d7ae98b3",
                          "translations": null,
                          "name": "Floor Inspection",
                          "description": "Floor Inspection",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      }
                  ],
                  "highlight": false
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                  "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                  "translations": null,
                  "name": "Survey",
                  "description": "Survey of site",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory3_6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                  "code": "6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                  "translations": null,
                  "name": "Building Assessment",
                  "description": "Building Assessment",
                  "index": 0,
                  "category": "taxonomyCategory3",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_competencies_f",
                  "code": "competencies_f",
                  "translations": null,
                  "name": "Land Inspection Blueprint",
                  "description": "Blueprint of land inspection",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory2_roles_c",
                  "code": "roles_c",
                  "translations": null,
                  "name": "Site Manager",
                  "description": "Vice President acts as Site Manager for the work site",
                  "index": 0,
                  "category": "taxonomyCategory2",
                  "status": "Live",
                  "selected": false,
                  "children": [
                      {
                          "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                          "code": "competencies_level_1",
                          "translations": null,
                          "name": "Level 1",
                          "description": "Level 1",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_competencies_f",
                          "code": "competencies_f",
                          "translations": null,
                          "name": "Land Inspection Blueprint",
                          "description": "Blueprint of land inspection",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_activities_d",
                          "code": "activities_d",
                          "translations": null,
                          "name": "Site Earthing",
                          "description": "Ground digging activity of the site for further builds",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                          "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                          "translations": null,
                          "name": "Level 2",
                          "description": "Level 2",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                          "code": "competencies_b",
                          "translations": null,
                          "name": "Coverage and surveillance",
                          "description": "In a area, how to plan the surveillance",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_activities_c",
                          "code": "activities_c",
                          "translations": null,
                          "name": "Site Inspection",
                          "description": "Inspection of the site area and plan",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                          "code": "6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                          "translations": null,
                          "name": "Building Assessment",
                          "description": "Building Assessment",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "translations": null,
                          "name": "Level 3",
                          "description": "Level 3 of Assessment Documentations",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      }
                  ],
                  "highlight": false
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_competencies_c",
                  "code": "competencies_c",
                  "translations": null,
                  "name": "Earth core concepts",
                  "description": "Concepts of earth core cutting and digging",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory2_roles_b",
                  "code": "roles_b",
                  "translations": null,
                  "name": "Floor Manager",
                  "description": "Vice President acts as Floor Manager for the work site",
                  "index": 0,
                  "category": "taxonomyCategory2",
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
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "translations": null,
                          "name": "Level 3",
                          "description": "Level 3 of Assessment Documentations",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_activities_e",
                          "code": "activities_e",
                          "translations": null,
                          "name": "Floor Map Creation",
                          "description": "Creating the floor map for the electric and water orders",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live",
                          "selected": true,
                          "children": [
                              {
                                  "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                  "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                  "translations": null,
                                  "name": "Survey",
                                  "description": "Survey of site",
                                  "index": 0,
                                  "category": "taxonomyCategory4",
                                  "status": "Live",
                                  "selected": false,
                                  "children": [
                                      {
                                          "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                          "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                          "translations": null,
                                          "name": "Level 3",
                                          "description": "Level 3 of Assessment Documentations",
                                          "index": 0,
                                          "category": "taxonomyCategory5",
                                          "status": "Live"
                                      },
                                      {
                                          "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                          "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                          "translations": null,
                                          "name": "Level 2",
                                          "description": "Level 2",
                                          "index": 0,
                                          "category": "taxonomyCategory5",
                                          "status": "Live"
                                      },
                                      {
                                          "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                          "code": "competencies_level_1",
                                          "translations": null,
                                          "name": "Level 1",
                                          "description": "Level 1",
                                          "index": 0,
                                          "category": "taxonomyCategory5",
                                          "status": "Live"
                                      }
                                  ],
                                  "highlight": false
                              },
                              {
                                  "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                  "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                  "translations": null,
                                  "name": "Level 2",
                                  "description": "Level 2",
                                  "index": 0,
                                  "category": "taxonomyCategory5",
                                  "status": "Live"
                              },
                              {
                                  "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                  "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                  "translations": null,
                                  "name": "Level 3",
                                  "description": "Level 3 of Assessment Documentations",
                                  "index": 0,
                                  "category": "taxonomyCategory5",
                                  "status": "Live"
                              },
                              {
                                  "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                  "code": "competencies_level_1",
                                  "translations": null,
                                  "name": "Level 1",
                                  "description": "Level 1",
                                  "index": 0,
                                  "category": "taxonomyCategory5",
                                  "status": "Live"
                              },
                              {
                                  "identifier": "fracing_fw_taxonomycategory4_competencies_a",
                                  "code": "competencies_a",
                                  "translations": null,
                                  "name": "Floor Planning and Mapping",
                                  "description": "Creating plans for the floor and layout blueprints",
                                  "index": 0,
                                  "category": "taxonomyCategory4",
                                  "status": "Live",
                                  "selected": false,
                                  "children": [
                                      {
                                          "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                          "code": "competencies_level_1",
                                          "translations": null,
                                          "name": "Level 1",
                                          "description": "Level 1",
                                          "index": 0,
                                          "category": "taxonomyCategory5",
                                          "status": "Live"
                                      },
                                      {
                                          "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                          "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                          "translations": null,
                                          "name": "Level 2",
                                          "description": "Level 2",
                                          "index": 0,
                                          "category": "taxonomyCategory5",
                                          "status": "Live"
                                      }
                                  ],
                                  "highlight": false
                              },
                              {
                                  "identifier": "fracing_fw_taxonomycategory4_competencies_c",
                                  "code": "competencies_c",
                                  "translations": null,
                                  "name": "Earth core concepts",
                                  "description": "Concepts of earth core cutting and digging",
                                  "index": 0,
                                  "category": "taxonomyCategory4",
                                  "status": "Live",
                                  "selected": true,
                                  "children": [
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
                          ],
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
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_competencies_c",
                          "code": "competencies_c",
                          "translations": null,
                          "name": "Earth core concepts",
                          "description": "Concepts of earth core cutting and digging",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      }
                  ],
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
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                  "code": "competencies_b",
                  "translations": null,
                  "name": "Coverage and surveillance",
                  "description": "In a area, how to plan the surveillance",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                  "code": "competencies_level_1",
                  "translations": null,
                  "name": "Level 1",
                  "description": "Level 1",
                  "index": 0,
                  "category": "taxonomyCategory5",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_787bb123-3926-4226-a866-1a51d7ae98b3",
                  "code": "787bb123-3926-4226-a866-1a51d7ae98b3",
                  "translations": null,
                  "name": "Floor Inspection",
                  "description": "Floor Inspection",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                  "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                  "translations": null,
                  "name": "Level 2",
                  "description": "Level 2",
                  "index": 0,
                  "category": "taxonomyCategory5",
                  "status": "Live"
              }
          ],
          "identifier": "fracing_fw_taxonomycategory1_positions_c",
          "code": "positions_c",
          "translations": null,
          "name": "Vice President",
          "description": "Vice President responsible for heading the site activities",
          "index": 3,
          "category": "taxonomyCategory1",
          "status": status as NSFramework.TNodeStatus,
          "children": [
              {
                  "identifier": "fracing_fw_taxonomycategory4_competencies_a",
                  "code": "competencies_a",
                  "translations": null,
                  "name": "Floor Planning and Mapping",
                  "description": "Creating plans for the floor and layout blueprints",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_b675af5f-aeaa-4414-85ae-765be1dacb08",
                  "code": "b675af5f-aeaa-4414-85ae-765be1dacb08",
                  "translations": null,
                  "name": "Land Evaluation",
                  "description": "Evaluation of the Land",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory2_roles_a",
                  "code": "roles_a",
                  "translations": null,
                  "name": "Area Manager",
                  "description": "Vice President acts as Area Manager for the work site",
                  "index": 0,
                  "category": "taxonomyCategory2",
                  "status": "Live",
                  "selected": false,
                  "children": [
                      {
                          "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                          "code": "competencies_level_1",
                          "translations": null,
                          "name": "Level 1",
                          "description": "Level 1",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_competencies_a",
                          "code": "competencies_a",
                          "translations": null,
                          "name": "Floor Planning and Mapping",
                          "description": "Creating plans for the floor and layout blueprints",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_62d9c3b0-1d95-4c94-90de-d1034844a3be",
                          "code": "62d9c3b0-1d95-4c94-90de-d1034844a3be",
                          "translations": null,
                          "name": "Building Area Approval",
                          "description": "Approval of the Building Area - Commercial and Residential",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                          "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                          "translations": null,
                          "name": "Survey",
                          "description": "Survey of site",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_b675af5f-aeaa-4414-85ae-765be1dacb08",
                          "code": "b675af5f-aeaa-4414-85ae-765be1dacb08",
                          "translations": null,
                          "name": "Land Evaluation",
                          "description": "Evaluation of the Land",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "translations": null,
                          "name": "Level 3",
                          "description": "Level 3 of Assessment Documentations",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_activities_b",
                          "code": "activities_b",
                          "translations": null,
                          "name": "Zonal Area Approval",
                          "description": "Approvals for the Zonal Area Management",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_activities_a",
                          "code": "activities_a",
                          "translations": null,
                          "name": "Area Assessment",
                          "description": " Assessment of the area level coverage",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                          "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                          "translations": null,
                          "name": "Level 2",
                          "description": "Level 2",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                          "code": "competencies_b",
                          "translations": null,
                          "name": "Coverage and surveillance",
                          "description": "In a area, how to plan the surveillance",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_787bb123-3926-4226-a866-1a51d7ae98b3",
                          "code": "787bb123-3926-4226-a866-1a51d7ae98b3",
                          "translations": null,
                          "name": "Floor Inspection",
                          "description": "Floor Inspection",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      }
                  ],
                  "highlight": false
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                  "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                  "translations": null,
                  "name": "Survey",
                  "description": "Survey of site",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory3_6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                  "code": "6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                  "translations": null,
                  "name": "Building Assessment",
                  "description": "Building Assessment",
                  "index": 0,
                  "category": "taxonomyCategory3",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_competencies_f",
                  "code": "competencies_f",
                  "translations": null,
                  "name": "Land Inspection Blueprint",
                  "description": "Blueprint of land inspection",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory2_roles_c",
                  "code": "roles_c",
                  "translations": null,
                  "name": "Site Manager",
                  "description": "Vice President acts as Site Manager for the work site",
                  "index": 0,
                  "category": "taxonomyCategory2",
                  "status": "Live",
                  "selected": false,
                  "children": [
                      {
                          "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                          "code": "competencies_level_1",
                          "translations": null,
                          "name": "Level 1",
                          "description": "Level 1",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_competencies_f",
                          "code": "competencies_f",
                          "translations": null,
                          "name": "Land Inspection Blueprint",
                          "description": "Blueprint of land inspection",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_activities_d",
                          "code": "activities_d",
                          "translations": null,
                          "name": "Site Earthing",
                          "description": "Ground digging activity of the site for further builds",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                          "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                          "translations": null,
                          "name": "Level 2",
                          "description": "Level 2",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                          "code": "competencies_b",
                          "translations": null,
                          "name": "Coverage and surveillance",
                          "description": "In a area, how to plan the surveillance",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_activities_c",
                          "code": "activities_c",
                          "translations": null,
                          "name": "Site Inspection",
                          "description": "Inspection of the site area and plan",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                          "code": "6565f703-d5a5-4987-bcdc-b32cc5f104c0",
                          "translations": null,
                          "name": "Building Assessment",
                          "description": "Building Assessment",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "translations": null,
                          "name": "Level 3",
                          "description": "Level 3 of Assessment Documentations",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      }
                  ],
                  "highlight": false
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_competencies_c",
                  "code": "competencies_c",
                  "translations": null,
                  "name": "Earth core concepts",
                  "description": "Concepts of earth core cutting and digging",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory2_roles_b",
                  "code": "roles_b",
                  "translations": null,
                  "name": "Floor Manager",
                  "description": "Vice President acts as Floor Manager for the work site",
                  "index": 0,
                  "category": "taxonomyCategory2",
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
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                          "translations": null,
                          "name": "Level 3",
                          "description": "Level 3 of Assessment Documentations",
                          "index": 0,
                          "category": "taxonomyCategory5",
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory3_activities_e",
                          "code": "activities_e",
                          "translations": null,
                          "name": "Floor Map Creation",
                          "description": "Creating the floor map for the electric and water orders",
                          "index": 0,
                          "category": "taxonomyCategory3",
                          "status": "Live",
                          "selected": true,
                          "children": [
                              {
                                  "identifier": "fracing_fw_taxonomycategory4_f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                  "code": "f51a525c-48b6-427c-8b44-9bd7a1238c60",
                                  "translations": null,
                                  "name": "Survey",
                                  "description": "Survey of site",
                                  "index": 0,
                                  "category": "taxonomyCategory4",
                                  "status": "Live",
                                  "selected": false,
                                  "children": [
                                      {
                                          "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                          "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                          "translations": null,
                                          "name": "Level 3",
                                          "description": "Level 3 of Assessment Documentations",
                                          "index": 0,
                                          "category": "taxonomyCategory5",
                                          "status": "Live"
                                      },
                                      {
                                          "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                          "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                          "translations": null,
                                          "name": "Level 2",
                                          "description": "Level 2",
                                          "index": 0,
                                          "category": "taxonomyCategory5",
                                          "status": "Live"
                                      },
                                      {
                                          "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                          "code": "competencies_level_1",
                                          "translations": null,
                                          "name": "Level 1",
                                          "description": "Level 1",
                                          "index": 0,
                                          "category": "taxonomyCategory5",
                                          "status": "Live"
                                      }
                                  ],
                                  "highlight": false
                              },
                              {
                                  "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                  "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                  "translations": null,
                                  "name": "Level 2",
                                  "description": "Level 2",
                                  "index": 0,
                                  "category": "taxonomyCategory5",
                                  "status": "Live"
                              },
                              {
                                  "identifier": "fracing_fw_taxonomycategory5_16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                  "code": "16e4cb13-768e-42fa-ba50-9054b6bc6687",
                                  "translations": null,
                                  "name": "Level 3",
                                  "description": "Level 3 of Assessment Documentations",
                                  "index": 0,
                                  "category": "taxonomyCategory5",
                                  "status": "Live"
                              },
                              {
                                  "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                  "code": "competencies_level_1",
                                  "translations": null,
                                  "name": "Level 1",
                                  "description": "Level 1",
                                  "index": 0,
                                  "category": "taxonomyCategory5",
                                  "status": "Live"
                              },
                              {
                                  "identifier": "fracing_fw_taxonomycategory4_competencies_a",
                                  "code": "competencies_a",
                                  "translations": null,
                                  "name": "Floor Planning and Mapping",
                                  "description": "Creating plans for the floor and layout blueprints",
                                  "index": 0,
                                  "category": "taxonomyCategory4",
                                  "status": "Live",
                                  "selected": false,
                                  "children": [
                                      {
                                          "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                                          "code": "competencies_level_1",
                                          "translations": null,
                                          "name": "Level 1",
                                          "description": "Level 1",
                                          "index": 0,
                                          "category": "taxonomyCategory5",
                                          "status": "Live"
                                      },
                                      {
                                          "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                          "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                                          "translations": null,
                                          "name": "Level 2",
                                          "description": "Level 2",
                                          "index": 0,
                                          "category": "taxonomyCategory5",
                                          "status": "Live"
                                      }
                                  ],
                                  "highlight": false
                              },
                              {
                                  "identifier": "fracing_fw_taxonomycategory4_competencies_c",
                                  "code": "competencies_c",
                                  "translations": null,
                                  "name": "Earth core concepts",
                                  "description": "Concepts of earth core cutting and digging",
                                  "index": 0,
                                  "category": "taxonomyCategory4",
                                  "status": "Live",
                                  "selected": true,
                                  "children": [
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
                          ],
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
                          "status": "Live"
                      },
                      {
                          "identifier": "fracing_fw_taxonomycategory4_competencies_c",
                          "code": "competencies_c",
                          "translations": null,
                          "name": "Earth core concepts",
                          "description": "Concepts of earth core cutting and digging",
                          "index": 0,
                          "category": "taxonomyCategory4",
                          "status": "Live"
                      }
                  ],
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
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_competencies_b",
                  "code": "competencies_b",
                  "translations": null,
                  "name": "Coverage and surveillance",
                  "description": "In a area, how to plan the surveillance",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory5_competencies_level_1",
                  "code": "competencies_level_1",
                  "translations": null,
                  "name": "Level 1",
                  "description": "Level 1",
                  "index": 0,
                  "category": "taxonomyCategory5",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory4_787bb123-3926-4226-a866-1a51d7ae98b3",
                  "code": "787bb123-3926-4226-a866-1a51d7ae98b3",
                  "translations": null,
                  "name": "Floor Inspection",
                  "description": "Floor Inspection",
                  "index": 0,
                  "category": "taxonomyCategory4",
                  "status": "Live"
              },
              {
                  "identifier": "fracing_fw_taxonomycategory5_7c9ceafa-026b-4977-aa95-62e6d5c81189",
                  "code": "7c9ceafa-026b-4977-aa95-62e6d5c81189",
                  "translations": null,
                  "name": "Level 2",
                  "description": "Level 2",
                  "index": 0,
                  "category": "taxonomyCategory5",
                  "status": "Live"
              }
          ],
          "highlight": false,
          "selected": true,
          "config":''
      }
  ],
 
]);
  
});
