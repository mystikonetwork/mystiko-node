import { core } from '@mystikonetwork/protos';
import mystiko from '../../src';
import { createAccount, createWallet, initMystiko } from '../common/base';

beforeAll(() => {
  initMystiko();
  createWallet();
  createAccount();
});

test('test chainSyncedBlock', () => {
  const response = mystiko.synchronizer?.chainSyncedBlock(BigInt(97));
  expect(response).toBeGreaterThan(BigInt(100));
  expect(() => {
    mystiko.synchronizer?.chainSyncedBlock(BigInt(1));
  }).toThrow();
});

test('test chainSyncedBlock', () => {
  const response = mystiko.synchronizer?.contractSyncedBlock(
    BigInt(11155111),
    '0xAE77941b3bd4d2293E13A9a69E64A0ACFf5bBC55',
  );
  expect(response).toBe(BigInt(5372242));

  expect(() => {
    mystiko.synchronizer?.contractSyncedBlock(BigInt(1), '0x9b42ec45f6fb6c7d252c66741e960585888de7b6');
  }).toThrow();
});

test('test status', () => {
  const response = mystiko.synchronizer?.status(false);
  expect(response?.chains.length).toBe(2);
  const chainIds = response?.chains.map((chain) => BigInt(chain.chainId));
  expect(chainIds).toEqual(expect.arrayContaining([BigInt(11155111), BigInt(97)]));
});

test('test sync', () => {
  const options = new core.synchronizer.v1.SynchronizerSyncOptions({
    chainIds: [BigInt(1)],
  });
  expect(() => {
    mystiko.synchronizer?.sync(options);
  }).toThrow();
});

test('test reset', () => {
  const options = new core.synchronizer.v1.SynchronizerResetOptions({
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
