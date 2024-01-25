import { TestBed } from '@angular/core/testing';

import { ConnectorService } from './connector.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

declare var LeaderLine: any;

class ConnectMockService {}

describe('ConnectorService', () => {
  let connectorService:ConnectorService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      {provide:ConnectorService, UseClass:'ConnectMockService'}
    ]
  }));

  beforeEach(() =>{
    connectorService = TestBed.inject(ConnectorService);
  });

  it('should be created', () => {
     expect(connectorService).toBeTruthy();
  });

  // it('should return connected dots', () => {
  //    expect(connectorService._drawLine(source,target,null, '#box1', '#box2')).toEqual([22]);
  // });

  it('should remove all the line', () => {
      connectorService.connectorMap = {
        connect1:{
          lines:[
            {name:'dev0', line:[]},
            {name: 'dev1', line:[]},
            {name: 'dev3', line:[]}
          ]
        }
      };
      connectorService.removeAllLines();
      expect(connectorService.connectorMap).toEqual({});
  });


});

let source = document.createElement('div');
source.id='vp';

let target =  [
    {
        "target": "taxonomyCategory2Card1",
        "line": "",
        "targetType": "id"
    },
    {
        "target": "taxonomyCategory2Card2",
        "line": "",
        "targetType": "id"
    },
    {
        "target": "taxonomyCategory2Card3",
        "line": "",
        "targetType": "id"
    }
]