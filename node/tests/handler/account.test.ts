import { core, storage } from '@mystikonetwork/protos';
import mystiko from '../../src';
import { createAccount, createWallet, initMystiko, WalletPassword } from '../common/base';

beforeAll(() => {
  initMystiko();
  createWallet();
  createAccount();
});

test('test count', () => {
  const response = mystiko.account?.count(undefined);
  expect(response).toBeDefined();
  expect(response).toBe(BigInt(1));

  const filter1 = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });
  const response1 = mystiko.account?.count(filter1);
  expect(response1).toBeDefined();
  expect(response1).toBe(BigInt(1));

  const filter2 = new storage.v1.Condition({
    subFilters: [],
    operator: storage.v1.ConditionOperator.OR,
  });
  const response2 = mystiko.account?.count(filter2);
  expect(response2).toBeDefined();
  expect(response2).toBe(BigInt(1));

  const filter3 = new storage.v1.SubFilter({
    column: 'name',
    values: [],
    operator: storage.v1.SubFilterOperator.IS_NOT_NULL,
  });
  const response3 = mystiko.account?.count(filter3);
  expect(response3).toBeDefined();
  expect(response3).toBe(BigInt(1));
});

test('test find', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);
  expect(response?.[0].name).toBe('test_account');

  const filter1 = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });
  const response1 = mystiko.account?.find(filter1);
  expect(response1).toBeDefined();
  expect(response1?.length).toBe(1);
  expect(response1?.[0].name).toBe('test_account');

  const filter2 = new storage.v1.Condition({
    subFilters: [],
    operator: storage.v1.ConditionOperator.OR,
  });
  const response2 = mystiko.account?.find(filter2);
  expect(response2).toBeDefined();
  expect(response2?.length).toBe(1);
  expect(response2?.[0].name).toBe('test_account');

  const filter3 = new storage.v1.SubFilter({
    column: 'name',
    values: [],
    operator: storage.v1.SubFilterOperator.IS_NOT_NULL,
  });
  const response3 = mystiko.account?.find(filter3);
  expect(response3).toBeDefined();
  expect(response3?.length).toBe(1);
  expect(response3?.[0].name).toBe('test_account');

  const filter4 = new storage.v1.SubFilter({
    column: 'name',
    values: [],
    operator: storage.v1.SubFilterOperator.EQUAL,
  });
  const response4 = mystiko.account?.find(filter4);
  expect(response4).toBeDefined();
  expect(response4?.length).toBe(0);
});

test('test findById', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);
  expect(response?.[0].name).toBe('test_account');

  const id = response?.[0].name ? response?.[0].id : 'undefined';
  const response2 = mystiko.account?.findById(id);
  expect(response2).toBeDefined();
  expect(response2?.name).toBe('test_account');

  const response3 = mystiko.account?.findById('undefined');
  expect(response3).toBeUndefined();
});

test('test findByPublicKey', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);
  expect(response?.[0].name).toBe('test_account');

  const publicKey = response?.[0].name ? response?.[0].publicKey : 'undefined';
  const response2 = mystiko.account?.findByPublicKey(publicKey);
  expect(response2).toBeDefined();
  expect(response2?.name).toBe('test_account');

  const response3 = mystiko.account?.findByPublicKey('undefined');
  expect(response3).toBeUndefined();
});

test('test findByShieldedAddress', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);
  expect(response?.[0].name).toBe('test_account');

  const shieldedAddress = response?.[0].name ? response?.[0].shieldedAddress : 'undefined';
  const response2 = mystiko.account?.findByShieldedAddress(shieldedAddress);
  expect(response2).toBeDefined();
  expect(response2?.name).toBe('test_account');

  const response3 = mystiko.account?.findByShieldedAddress('undefined');
  expect(response3).toBeUndefined();
});

test('test updateById', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);

  const id2 = response?.[0].id ? response?.[0].id : 'undefined';
  const options2 = new core.handler.v1.UpdateAccountOptions({
    walletPassword: WalletPassword,
    name: 'account_updateById',
  });
  const response2 = mystiko.account?.updateById(id2, options2);
  expect(response2).toBeDefined();
  expect(response2?.name).toBe('account_updateById');

  const options3 = new core.handler.v1.UpdateAccountOptions({
    walletPassword: WalletPassword,
    name: 'account_wrong',
  });

  expect(() => {
    mystiko.account?.updateById('wrong_id', options3);
  }).toThrow();
});

test('test updateByPublicKey', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);

  const publicKey2 = response?.[0].publicKey ? response?.[0].publicKey : 'undefined';
  const options2 = new core.handler.v1.UpdateAccountOptions({
    walletPassword: WalletPassword,
    name: 'account_updateByPublicKey',
  });
  const response2 = mystiko.account?.updateByPublicKey(publicKey2, options2);
  expect(response2).toBeDefined();
  expect(response2?.name).toBe('account_updateByPublicKey');

  const options3 = new core.handler.v1.UpdateAccountOptions({
    walletPassword: WalletPassword,
    name: 'account_wrong',
  });

  expect(() => {
    mystiko.account?.updateById('wrong_key', options3);
  }).toThrow();
});

test('test updateByShieldedAddress', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);

  const shieldedAddress = response?.[0].shieldedAddress ? response?.[0].shieldedAddress : 'undefined';
  const options2 = new core.handler.v1.UpdateAccountOptions({
    walletPassword: WalletPassword,
    name: 'account_updateByPublicKey',
  });
  const response2 = mystiko.account?.updateByShieldedAddress(shieldedAddress, options2);
  expect(response2).toBeDefined();
  expect(response2?.name).toBe('account_updateByPublicKey');

  const options3 = new core.handler.v1.UpdateAccountOptions({
    walletPassword: WalletPassword,
    name: 'account_wrong',
  });

  expect(() => {
    mystiko.account?.updateById('wrong_address', options3);
  }).toThrow();

  const options4 = new core.handler.v1.UpdateAccountOptions({
    walletPassword: WalletPassword,
    name: 'test_account',
  });
  const response4 = mystiko.account?.updateByShieldedAddress(shieldedAddress, options4);
  expect(response4).toBeDefined();
  expect(response4?.name).toBe('test_account');
});

test('test update encryption', () => {
  const newPassword = 'new123&456Abc';

  expect(() => {
    mystiko.account?.updateEncryption(WalletPassword, newPassword);
  }).toThrow();

  const response = mystiko.wallet?.updatePassword(WalletPassword, newPassword);
  expect(response).toBeDefined();
  expect(response?.accountNonce).toBe(1);

  const response2 = mystiko.account?.updateEncryption(WalletPassword, newPassword);
  expect(response2).toBeDefined();
  expect(response2?.length).toBe(1);
  expect(response2?.[0].name).toBe('test_account');

  const response3 = mystiko.wallet?.updatePassword(newPassword, WalletPassword);
  expect(response3).toBeDefined();
  expect(response3?.accountNonce).toBe(1);

  const response4 = mystiko.account?.updateEncryption(newPassword, WalletPassword);
  expect(response4?.length).toBe(1);
  expect(response4?.[0].name).toBe('test_account');

  expect(() => {
    mystiko.account?.updateEncryption('wrong pass word', WalletPassword);
  }).toThrow();
});

test('test exportSecretKeyById', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);

  const id = response?.[0].id ? response?.[0].id : 'undefined';
  const response2 = mystiko.account?.exportSecretKeyById(WalletPassword, id);
  expect(response2).toBeDefined();
  expect(response2?.length).toBeGreaterThan(10);

  expect(() => {
    mystiko.account?.exportSecretKeyById(WalletPassword, 'wrong id');
  }).toThrow();

  expect(() => {
    mystiko.account?.exportSecretKeyById('wrong password', id);
  }).toThrow();
});

test('test exportSecretKeyByPublicKey', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);

  const publicKey = response?.[0].publicKey ? response?.[0].publicKey : 'undefined';
  const response2 = mystiko.account?.exportSecretKeyByPublicKey(WalletPassword, publicKey);
  expect(response2).toBeDefined();
  expect(response2?.length).toBeGreaterThan(10);

  expect(() => {
    mystiko.account?.exportSecretKeyById(WalletPassword, 'wrong key');
  }).toThrow();

  expect(() => {
    mystiko.account?.exportSecretKeyById('wrong password', publicKey);
  }).toThrow();
});

test('test exportSecretKeyByShieldedAddress', () => {
  const response = mystiko.account?.find(undefined);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);

  const shieldedAddress = response?.[0].shieldedAddress ? response?.[0].shieldedAddress : 'undefined';
  const response2 = mystiko.account?.exportSecretKeyByShieldedAddress(WalletPassword, shieldedAddress);
  expect(response2).toBeDefined();
  expect(response2?.length).toBeGreaterThan(10);

  expect(() => {
    mystiko.account?.exportSecretKeyById(WalletPassword, 'wrong address');
  }).toThrow();

  expect(() => {
    mystiko.account?.exportSecretKeyById('wrong password', shieldedAddress);
  }).toThrow();
});
