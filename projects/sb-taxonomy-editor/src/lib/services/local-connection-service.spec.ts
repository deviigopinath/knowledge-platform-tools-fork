import { IConnectionType } from '../models/connection-type.model';
import { LocalConnectionService } from './local-connection.service';

xdescribe('LocalConnectionService', () => {
  let service: LocalConnectionService;

  beforeEach(() => {
    service = new LocalConnectionService();
    const _vars: IConnectionType = {
        data: {
            endpoint: '',
            frameworkName: '',
            token: '',
            isApprovalRequired: false
        },
        source: 'online'
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set _vars.data properties based on environment values', () => {
    const mockEnvironment = {
        url: 'https://compass-dev.tarento.com',
        token: 'mockToken',
        frameworkName: 'Angular',
        isApprovalRequired: true
    };

    spyOn(localStorage, 'getItem').withArgs('environment').and.returnValue(JSON.stringify(mockEnvironment));

    const service = new LocalConnectionService();

    expect(service['_vars'].data.endpoint).toBe(mockEnvironment.url);
    expect(service['_vars'].data.token).toBe(mockEnvironment.token);
    expect(service['_vars'].data.frameworkName).toBe(mockEnvironment.frameworkName);
    expect(service['_vars'].data.isApprovalRequired).toBe(mockEnvironment.isApprovalRequired);
  });


  it('should return apiUrl from local storage if available', () => {
    const mockData = { endpoint: 'https://compass-dev.tarento.com' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ data: mockData }));

    expect(service.apiUrl).toBe(mockData.endpoint);
});


  it('should return default apiUrl if not available in local storage', () => {
    expect(service.apiUrl).toBe('');
  });

  it('should return token from local storage if available', () => {
    const mockData = { token: 'mockToken' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ data: mockData }));

    expect(service.token).toBe(mockData.token);
});


  it('should return default token if not available in local storage', () => {
    expect(service.token).toBe('');
  });

  it('should return frameworkName from local storage if available', () => {
    const mockData = { frameworkName: 'ExampleFramework' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ data: mockData }));

    expect(service.frameworkName).toBe(mockData.frameworkName);
});


  it('should return default frameworkName if not available in local storage', () => {
    expect(service.frameworkName).toBe('');
  });

  it('should return connectionType from local storage if available', () => {
    spyOn(localStorage, 'getItem').withArgs('env').and.returnValue(JSON.stringify({ source: 'offline', data: {} }));
    expect(service.connectionType).toBe('offline');
  });

  it('should return default connectionType if not available in local storage', () => {
    spyOn(localStorage, 'getItem').withArgs('env').and.returnValue(null);
    expect(service.connectionType).toBe('online');
  });

  it('should update local storage', () => {
    const mockData: IConnectionType = { source: 'online', data: { endpoint: 'https://compass-dev.tarento.com', token: 'testToken',frameworkName: '', isApprovalRequired: false } };
    service.updateLocalStorage(mockData);
    expect(localStorage.getItem('env')).toBe(JSON.stringify(mockData));
  });

  it('should clear local storage', () => {
    localStorage.setItem('env', 'test');
    localStorage.setItem('terms', 'test');
    service.clearLocalStorage();
    expect(localStorage.getItem('env')).toBeNull();
    expect(localStorage.getItem('terms')).toBeNull();
  });

  it('should return default configuration info', () => {
    const defaultConfig = {
      endpoint: '',
      frameworkName: '',
      token: '',
      isApprovalRequired: false
    };
    expect(service.getConfigInfo()).toEqual(defaultConfig);
  });
});
