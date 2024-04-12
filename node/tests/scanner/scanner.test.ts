import { core } from '@mystikonetwork/protos';
import mystiko from '../../src';
import { createAccount, createWallet, initMystiko, WalletPassword } from '../common/base';

beforeAll(() => {
  initMystiko();
  createWallet();
  createAccount();
});

test('test scan', () => {
  const options = new core.scanner.v1.ScanOptions({
    walletPassword: WalletPassword,
    shieldedAddresses: [],
  });
  const response = mystiko.scanner?.scan(options);
  expect(response?.totalCount).toBe(BigInt(0));
  expect(response?.ownedCount).toBe(BigInt(0));

  expect(() => {
    const options2 = new core.scanner.v1.ScanOptions({
      walletPassword: 'wrong pass word',
      shieldedAddresses: [],
    });
    mystiko.scanner?.scan(options2);
  }).toThrow();
});

test('test reset', () => {
  const options = new core.scanner.v1.ScannerResetOptions({
    shieldedAddresses: [],
  });
  const response = mystiko.scanner?.reset(options);
  expect(response).toBeDefined();
});

test('test balance', () => {
  const options = new core.scanner.v1.BalanceOptions({
    shieldedAddresses: [],
    chainIds: [BigInt(11155111), BigInt(97)],
    assetSymbols: ['MTT'],
  });
  const response = mystiko.scanner?.balance(options);
  expect(response?.balances.length).toBe(0);
});

test('test assets', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);

  const shieldedAddress = response?.[0].shieldedAddress ? response?.[0].shieldedAddress : '0x123';
  const options1 = new core.scanner.v1.AssetsOptions({
    shieldedAddresses: [shieldedAddress],
  });
  const response1 = mystiko.scanner?.assets(options1);
  expect(response1?.length).toBe(0);
});

test('test chainAssets', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);

  const shieldedAddress = response?.[0].shieldedAddress ? response?.[0].shieldedAddress : '0x123';
  const options1 = new core.scanner.v1.AssetsOptions({
    shieldedAddresses: [shieldedAddress],
  });
  const response1 = mystiko.scanner?.chainAssets(BigInt(11155111), options1);
  expect(response1).toBeUndefined();
});
