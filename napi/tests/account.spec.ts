import { api, core, storage } from '@mystikonetwork/protos';
import test from 'ava';
import { Account } from '../index';
import { InitMystiko, createWallet, createAccount, WalletPassword } from './base';

const { CreateAccountResponse } = api.handler.v1;
const { CountAccountRequest, CountAccountResponse } = api.handler.v1;
const { FindAccountRequest, FindAccountResponse } = api.handler.v1;
const { FindAccountByIdentifierRequest, FindAccountByIdentifierResponse } = api.handler.v1;
const { UpdateAccountRequest, UpdateAccountResponse } = api.handler.v1;
const { UpdateEncryptionRequest } = api.handler.v1;
const { ExportSecretKeyRequest, ExportSecretKeyResponse } = api.handler.v1;
const { UpdateAccountOptions } = core.handler.v1;
const { QueryFilter, ConditionOperator } = storage.v1;
const { ApiResponse } = api.v1;

test('test create', (t) => {
  InitMystiko();
  createWallet();
  const response = createAccount();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = CreateAccountResponse.fromBinary(rsp.result.value);
  t.is(data.account.name, 'test_account');
  t.pass();
});

test('test count', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const request = new CountAccountRequest({
    filter: new QueryFilter({
      conditions: [],
      conditionsOperator: ConditionOperator.OR,
    }),
  });
  const response = account.count(request.toBinary());
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = CountAccountResponse.fromBinary(rsp.result.value);
  t.is(data.count, BigInt(1));
  t.pass();
});

test('test count all', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const response = account.countAll();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = CountAccountResponse.fromBinary(rsp.result.value);
  t.is(data.count, BigInt(1));
  t.pass();
});

test('test find', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const request = new FindAccountRequest({
    filter: new QueryFilter({
      conditions: [],
      conditionsOperator: ConditionOperator.OR,
    }),
  });
  const response = account.find(request.toBinary());
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = FindAccountResponse.fromBinary(rsp.result.value);
  t.is(data.account.length, 1);
  t.is(data.account[0].name, 'test_account');
  t.pass();
});

test('test findAll', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const response = account.findAll();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = FindAccountResponse.fromBinary(rsp.result.value);
  t.is(data.account[0].name, 'test_account');
  t.pass();
});

test('test findById', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const response = account.findAll();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = FindAccountResponse.fromBinary(rsp.result.value);

  const request2 = new FindAccountByIdentifierRequest({
    identifier: data.account[0].id,
  });
  const response2 = account.findById(request2.toBinary());
  const rsp2 = ApiResponse.fromBinary(new Uint8Array(response2));
  t.assert(rsp2.code.success);
  const data2 = FindAccountByIdentifierResponse.fromBinary(rsp2.result.value);
  t.is(data2.account.name, 'test_account');
  t.pass();
});

test('test findByPublicKey', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const response = account.findAll();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = FindAccountResponse.fromBinary(rsp.result.value);

  const request2 = new FindAccountByIdentifierRequest({
    identifier: data.account[0].publicKey,
  });
  const response2 = account.findByPublicKey(request2.toBinary());
  const rsp2 = ApiResponse.fromBinary(new Uint8Array(response2));
  t.assert(rsp2.code.success);
  const data2 = FindAccountByIdentifierResponse.fromBinary(rsp2.result.value);
  t.is(data2.account.name, 'test_account');
  t.pass();
});

test('test findByShieldedAddress', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const response = account.findAll();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = FindAccountResponse.fromBinary(rsp.result.value);

  const request2 = new FindAccountByIdentifierRequest({
    identifier: data.account[0].shieldedAddress,
  });
  const response2 = account.findByShieldedAddress(request2.toBinary());
  const rsp2 = ApiResponse.fromBinary(new Uint8Array(response2));
  t.assert(rsp2.code.success);
  const data2 = FindAccountByIdentifierResponse.fromBinary(rsp2.result.value);
  t.is(data2.account.name, 'test_account');
  t.pass();
});

test('test updateById', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const response = account.findAll();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = FindAccountResponse.fromBinary(rsp.result.value);

  const request2 = new UpdateAccountRequest({
    identifier: data.account[0].id,
    options: new UpdateAccountOptions({
      walletPassword: WalletPassword,
      name: 'new account by update',
    }),
  });
  const response2 = account.updateById(request2.toBinary());
  const rsp2 = ApiResponse.fromBinary(new Uint8Array(response2));
  t.assert(rsp2.code.success);
  const data2 = UpdateAccountResponse.fromBinary(rsp2.result.value);
  t.is(data2.account.name, 'new account by update');
  t.pass();
});

test('test updateByPublicKey', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const response = account.findAll();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = FindAccountResponse.fromBinary(rsp.result.value);

  const request2 = new UpdateAccountRequest({
    identifier: data.account[0].publicKey,
    options: new UpdateAccountOptions({
      walletPassword: WalletPassword,
      name: 'new account by update',
    }),
  });
  const response2 = account.updateByPublicKey(request2.toBinary());
  const rsp2 = ApiResponse.fromBinary(new Uint8Array(response2));
  t.assert(rsp2.code.success);
  const data2 = UpdateAccountResponse.fromBinary(rsp2.result.value);
  t.is(data2.account.name, 'new account by update');
  t.pass();
});

test('test updateByShieldedAddress', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const response = account.findAll();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = FindAccountResponse.fromBinary(rsp.result.value);

  const request2 = new UpdateAccountRequest({
    identifier: data.account[0].shieldedAddress,
    options: new UpdateAccountOptions({
      walletPassword: WalletPassword,
      name: 'new account by update',
    }),
  });
  const response2 = account.updateByShieldedAddress(request2.toBinary());
  const rsp2 = ApiResponse.fromBinary(new Uint8Array(response2));
  t.assert(rsp2.code.success);
  const data2 = UpdateAccountResponse.fromBinary(rsp2.result.value);
  t.is(data2.account.name, 'new account by update');
  t.pass();
});

test('test updateEncryption', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const request = new UpdateEncryptionRequest({
    oldWalletPassword: WalletPassword,
    newWalletPassword: '123@ABC',
  });
  const response = account.updateEncryption(request.toBinary());
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(!rsp.code.success);
  t.pass();
});

test('test exportSecretKeyById', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const response = account.findAll();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = FindAccountResponse.fromBinary(rsp.result.value);

  const request2 = new ExportSecretKeyRequest({
    identifier: data.account[0].id,
    walletPassword: WalletPassword,
  });
  const response2 = account.exportSecretKeyById(request2.toBinary());
  const rsp2 = ApiResponse.fromBinary(new Uint8Array(response2));
  t.assert(rsp2.code.success);
  const data2 = ExportSecretKeyResponse.fromBinary(rsp2.result.value);
  t.assert(data2.secretKey.length > 10);
  t.pass();
});

test('test exportSecretKeyByPublicKey', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const response = account.findAll();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = FindAccountResponse.fromBinary(rsp.result.value);

  const request2 = new ExportSecretKeyRequest({
    identifier: data.account[0].publicKey,
    walletPassword: WalletPassword,
  });
  const response2 = account.exportSecretKeyByPublicKey(request2.toBinary());
  const rsp2 = ApiResponse.fromBinary(new Uint8Array(response2));
  t.assert(rsp2.code.success);
  const data2 = ExportSecretKeyResponse.fromBinary(rsp2.result.value);
  t.assert(data2.secretKey.length > 10);
  t.pass();
});

test('test exportSecretKeyByShieldedAddress', (t) => {
  InitMystiko();
  createWallet();
  createAccount();

  const account = new Account();
  const response = account.findAll();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = FindAccountResponse.fromBinary(rsp.result.value);

  const request2 = new ExportSecretKeyRequest({
    identifier: data.account[0].shieldedAddress,
    walletPassword: WalletPassword,
  });
  const response2 = account.exportSecretKeyByShieldedAddress(request2.toBinary());
  const rsp2 = ApiResponse.fromBinary(new Uint8Array(response2));
  t.assert(rsp2.code.success);
  const data2 = ExportSecretKeyResponse.fromBinary(rsp2.result.value);
  t.assert(data2.secretKey.length > 10);
  t.pass();
});
