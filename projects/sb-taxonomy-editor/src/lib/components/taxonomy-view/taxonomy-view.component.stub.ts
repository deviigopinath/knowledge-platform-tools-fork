import { BehaviorSubject } from "rxjs";
import { of } from "rxjs/internal/observable/of";
import { NSFramework } from "../../models/framework.model";

export class MockFrameworkService {
    list = list;
    selectionList = list;
    categoriesHash = new BehaviorSubject(allCategories);
    insertUpdateDeleteNotifier = new BehaviorSubject([]);
    currentSelection = new BehaviorSubject({});

    localConfig = {
        connectionType:' online'
    }
    rootConfig =  [
      {   
          "index": 1,
          "category": "board",
          "icon": "settings",
          "color": "#1d2327"
      },
      {   
          "index": 2,
          "category": "medium",
          "icon": "extension",
          "color": "#541675"
      },
      {   
          "index": 3,
          "category": "gradeLevel",
          "icon": "bar_chart",
          "color": "#9a6c80"
      },
      {   
          "index": 4,
          "category": "subject",
          "icon": "account_box",
          "color": "#d8666a"
      }
  ];
  environment: {
    frameworkName: 'fracing_fw',
    authToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0WEFsdFpGMFFhc1JDYlFnVXB4b2RvU2tLRUZyWmdpdCJ9.mXD7cSvv3Le6o_32lJplDck2D0IIMHnv0uJKq98YVwk',
    isApprovalRequired: true
  }

  getEnviroment() {
    return this.environment;
  }

  updateEnvironment(env:any) {
    this.environment = env;
  }

  setConfig(config) {
    this.rootConfig = config;
  }

  getConfig(){
    return this.rootConfig;
  }
  getFrameworkInfo(){
    return of(serviceRes);
  }

  removeOldLine() {
    // document.getElementsByClassName('leader-line');
  }
  getNextCategory(){
    return {
        code:'4g'
    }
  }
  
  getFrameworkId() {
    return 'fracing_fw';
  }
  getPreviousCategory() {
    return {
        "code": "taxonomyCategory1",
        "identifier": "fracing_fw_taxonomycategory1",
        "index": 1,
        "name": "Competencies",
        "status": "Live",
        "description": "Competencies of the work order",
        "translations": null
    }
  } 
  getLocalTermsByCategory() {
    return []; 
  }

}
export class ConnectorMockService {
    removeAllLines(){
        
    }
    updateConnectorsMap(){

    }
}


export class ApprovalMockService {

    createApproval(){
        return of({res:'successsfully created approval'});
    }
    getUpdateList() {
        return of(approvalTerm);
    }
    getWorkflowDetails(){
        return of({
            result:{
              updateFieldValues: [
                {name:'sas', selected:true}
              ]
            }});
    }
    updateWorkFlowApproval(){
        return of({
            res:'update for approval flow'
        });
    }
    getApprovalList(){
        return of([]);
    }
}

export const approvalTerm = [
    {
        category:'4g',
        name:'redmi'
    },
    {
        category:'5g',
        name:'redmi'
    }
];

export const allCategories = [
    {
        "code": "taxonomyCategory1",
        "identifier": "fracing_fw_taxonomycategory1",
        "index": 1,
        "name": "Positions",
        "status": "Live",
        "description": "Position of the work order",
        "translations": null
    },
    {
        "code": "taxonomyCategory2",
        "identifier": "fracing_fw_taxonomycategory2",
        "index": 2,
        "name": "Roles",
        "status": "Live",
        "description": "Roles of the work order",
        "translations": null
    },
    {
        "code": "taxonomyCategory3",
        "identifier": "fracing_fw_taxonomycategory3",
        "index": 3,
        "name": "Activities",
        "status": "Live",
        "description": "Activities of the work order",
        "translations": null
    },
    {
        "code": "taxonomyCategory4",
        "identifier": "fracing_fw_taxonomycategory4",
        "index": 4,
        "name": "Competencies",
        "status": "Live",
        "description": "Competencies of the work order",
        "translations": null
    },
    {
        "code": "taxonomyCategory5",
        "identifier": "fracing_fw_taxonomycategory5",
        "index": 5,
        "name": "Competency Levels",
        "status": "Live",
        "description": "Competency Levels of the work order",
        "translations": null
    }
];

export const serviceRes = {
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
};

const status = 'Live'
export const list =new Map([
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