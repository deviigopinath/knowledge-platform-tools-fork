import { TestBed } from '@angular/core/testing';

import { TokenInterceptorService } from './token-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler, HttpRequest } from '@angular/common/http';
import { FrameworkService } from './framework.service';
import { of } from 'rxjs/internal/observable/of';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/internal/Observable';

describe('TokenInterceptorService', () => {
  let frameWorkServie: FrameworkService;
  let client: HttpClient
  let controller: HttpTestingController

  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ],
    providers:[
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
      }
    ]
  }));
  
  beforeEach(() => {
      frameWorkServie =  TestBed.inject(FrameworkService);
      client = TestBed.inject(HttpClient)
      controller = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    const service: TokenInterceptorService = TestBed.inject(TokenInterceptorService);
    expect(service).toBeTruthy();
  });

  it('should set auth token to intercept service', () => {
    const service: TokenInterceptorService = TestBed.inject(TokenInterceptorService);
    const frameWorkServieSpy = spyOn(frameWorkServie, 'getEnviroment').and.returnValue(of({authToken:'evysrss'}));
    const requestMock = new HttpRequest('GET', '/test');
    const next: any = {
      handle: () => {
        return Observable.create(subscriber => {
          subscriber.complete();
        });
      }
    };
    
    service.intercept(requestMock, next);
    expect(frameWorkServieSpy).toHaveBeenCalled();
  });

});

