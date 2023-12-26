import mystiko from '../src';
import { destroyMystiko, initMystiko } from './common/base';

test('test initialize', () => {
  initMystiko();
  const init = mystiko.isInitialized();
  expect(init).toBe(true);
  destroyMystiko();
  const init2 = mystiko.isInitialized();
  expect(init2).toBe(false);
});
