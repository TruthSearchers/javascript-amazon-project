import {formatMoney} from '../../scripts/utils/money.js';

describe('formatMoney', () => {
  it('formats the cents into dollars', () => {
    expect(formatMoney(2095)).toEqual('20.95');
  });
  it('works with 0',()=>{
    expect(formatMoney(0)).toEqual('0.00');
  })
  it('works with float dollars',()=>{
    expect(formatMoney(2000.5)).toEqual('20.01');
  })

});

