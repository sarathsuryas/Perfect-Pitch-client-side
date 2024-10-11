import { FirstLetterToUpperCasePipe } from './first-letter-to-upper-case.pipe';

describe('FirstLetterToUpperCasePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstLetterToUpperCasePipe();
    expect(pipe).toBeTruthy();
  });
});
