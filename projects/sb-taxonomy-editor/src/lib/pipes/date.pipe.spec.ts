import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipe();
    expect(pipe).toBeTruthy();
  });
  xit('create an instance', () => {
    const pipe = new DatePipe();
    
    expect(pipe.transform('11/09/20')).toEqual('11');
  });
});
