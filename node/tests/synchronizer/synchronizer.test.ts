import { core } from '@mystikonetwork/protos';
import mystiko from '../../src';
import { createAccount, createWallet, initMystiko } from '../common/base';

beforeAll(() => {
  initMystiko();
  createWallet();
  createAccount();
});
//
// test('test chainSyncedBlock', () => {
//   const response = mystiko.synchronizer?.chainSyncedBlock(BigInt(97));
//   console.log('rs ',response);
//   expect(response).toBeGreaterThan(BigInt(100));
//
//   expect(() => {
//     mystiko.synchronizer?.chainSyncedBlock(BigInt(1));
//   }).toThrow();
// });
//
// test('test chainSyncedBlock', () => {
//   const response = mystiko.synchronizer?.contractSyncedBlock(
//     BigInt(11155111),
//     '0x9b42ec45f6fb6c7d252c66741e960585888de7b6',
//   );
//   expect(response).toBe(BigInt(1000000));
//
//   expect(() => {
//     mystiko.synchronizer?.contractSyncedBlock(BigInt(1), '0x9b42ec45f6fb6c7d252c66741e960585888de7b6');
//   }).toThrow();
// });

test('test status', () => {
  const response = mystiko.synchronizer?.status(false);
  expect(response?.chains.length).toBe(2);
  const chainIds = response?.chains.map((chain) => BigInt(chain.chainId));
  expect(chainIds).toEqual(expect.arrayContaining([BigInt(11155111), BigInt(97)]));
});

test('test sync', () => {
  const options = new core.synchronizer.v1.SyncOptions({
    chainIds: [BigInt(1)],
  });
  expect(() => {
    mystiko.synchronizer?.sync(options);
  }).toThrow();
});

test('test reset', () => {
  const options = new core.synchronizer.v1.ResetOptions({
    chains: [
      new core.synchronizer.v1.ResetChainOptions({
        chainId: BigInt(11155111),
        contractAddresses: [],
      }),
    ],
  });
  const response = mystiko.synchronizer?.reset(options);
  expect(response).toBeUndefined();
});
