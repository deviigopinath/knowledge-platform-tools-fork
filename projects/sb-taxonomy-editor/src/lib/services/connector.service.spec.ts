import { TestBed } from '@angular/core/testing';

import { ConnectorService } from './connector.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { defaultConfig, LLOptions } from '../constants/app-constant';
import { HttpClient } from '@angular/common/http';

declare var LeaderLine: any;

class ConnectMockService {}

// class LeaderLine {
//   constructor() {}
// }
// (window as any).LeaderLine = LeaderLine;

describe('ConnectorService', () => {
  let service:ConnectorService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let renderLineSpy: jasmine.Spy;
  
  beforeEach(() => TestBed.configureTestingModule({
    
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      {provide:ConnectorService, UseClass:'ConnectMockService'}
    ]
  }));

  beforeEach(() =>{
    service = TestBed.inject(ConnectorService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    renderLineSpy = spyOn<any>(service, 'renderLine').and.callThrough();
  });

  it('should be created', () => {
     expect(service).toBeTruthy();
  });

  it('should correctly position the line', () => {
    
    const line = { position: jasmine.createSpy('position') };
    const elmWrapper = document.createElement('div');
    spyOn(document, 'querySelector').and.returnValue(elmWrapper);
    
    service['elmWrapper'] = elmWrapper;
    service.position(line);

    const transformStyle = elmWrapper.style.transform;
    expect(transformStyle).toBe('translate(0px, 0px)');

    expect(line.position).toHaveBeenCalled();
  });

  it('should remove all lines from connector map', async () => {
    const connectorMap = {
      key1: { lines: [{ line: { remove: jasmine.createSpy('remove') } }] }
    };
    service['connectorMap'] = connectorMap;
  
    // Call removeAllLines and wait for it to complete
    await service.removeAllLines();
  
    for (const key in connectorMap) {
      const lines = connectorMap[key].lines;
      
      lines.forEach(element => {
        expect(element.line.remove).toHaveBeenCalled();
      });
      expect(lines.length).toBe(0);
    }
  
    expect(service['connectorMap']).toEqual({});
  });
  

  it('should handle the case when connectorMap is empty', () => {
    service['connectorMap'] = {};

    service.removeAllLines();

    expect(service['connectorMap']).toEqual({});
  });

});