import mystiko from '../../src';
import { createWallet, initMystiko, WalletMnemonicPhrase, WalletPassword } from '../common/base';

beforeAll(() => {
  initMystiko();
  createWallet();
});

test('check current', () => {
  const response = mystiko.wallet?.checkCurrent();
  expect(response).toBeDefined();
  expect(response?.accountNonce).toBe(0);
});

test('check password', () => {
  const response = mystiko.wallet?.checkPassword(WalletPassword);
  expect(response).toBeDefined();
  expect(response?.accountNonce).toBe(0);

  expect(() => {
    mystiko.wallet?.checkPassword('wrong password');
  }).toThrow();
});

test('update password', () => {
  const newPassword = 'new&456Abc';
  const response = mystiko.wallet?.updatePassword(WalletPassword, newPassword);
  expect(response).toBeDefined();
  expect(response?.accountNonce).toBe(0);

  const response2 = mystiko.wallet?.checkPassword(newPassword);
  expect(response2).toBeDefined();
  expect(response2?.accountNonce).toBe(0);

  const response3 = mystiko.wallet?.updatePassword(newPassword, WalletPassword);
  expect(response3).toBeDefined();
  expect(response3?.accountNonce).toBe(0);

  expect(() => {
    mystiko.wallet?.updatePassword('wrong password', WalletPassword);
  }).toThrow();
});

test('export mnemonic phrase', () => {
  const response = mystiko.wallet?.exportMnemonicPhrase(WalletPassword);
  expect(response).toBeDefined();
  expect(response).toBe(WalletMnemonicPhrase);

  expect(() => {
    mystiko.wallet?.exportMnemonicPhrase('wrong password');
  }).toThrow();
});
