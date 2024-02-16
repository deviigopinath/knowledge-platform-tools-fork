import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform date string to day', () => {
    const pipe = new DatePipe();
    const result = pipe.transform('11/09/20');
    expect(result).toEqual('09');
  });

});
