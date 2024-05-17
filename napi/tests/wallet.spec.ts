import { api } from '@mystikonetwork/protos';
import test from 'ava';
import { Wallet } from '../index';
import { InitMystiko, createWallet, WalletPassword, WalletMnemonicPhrase } from './base';

const { CreateWalletResponse } = api.handler.v1;
const { CheckCurrentResponse } = api.handler.v1;
const { CheckPasswordRequest, CheckPasswordResponse } = api.handler.v1;
const { UpdatePasswordRequest, UpdatePasswordResponse } = api.handler.v1;
const { ExportMnemonicPhraseRequest, ExportMnemonicPhraseResponse } = api.handler.v1;
const { ApiResponse } = api.v1;

test('test create', (t) => {
  InitMystiko();
  const response = createWallet();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = CreateWalletResponse.fromBinary(rsp.result.value);
  t.is(data.wallet.accountNonce, 0);
  t.pass();
});

test('test checkCurrent', (t) => {
  InitMystiko();
  createWallet();
  const wallet = new Wallet();
  const response = wallet.checkCurrent();
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = CheckCurrentResponse.fromBinary(rsp.result.value);
  t.is(data.wallet.accountNonce, 0);
  t.pass();
});

test('test checkPassword', (t) => {
  InitMystiko();
  createWallet();
  const wallet = new Wallet();
  const request = new CheckPasswordRequest({
    password: WalletPassword,
  });
  const response = wallet.checkPassword(request.toBinary());
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = CheckPasswordResponse.fromBinary(rsp.result.value);
  t.is(data.wallet.accountNonce, 0);
  t.pass();
});

test('test updatePassword', (t) => {
  InitMystiko();
  createWallet();
  const newPassword = 'new&456Abc';
  const wallet = new Wallet();
  const request1 = new UpdatePasswordRequest({
    oldPassword: WalletPassword,
    newPassword: newPassword,
  });
  const response1 = wallet.updatePassword(request1.toBinary());
  const rsp1 = ApiResponse.fromBinary(new Uint8Array(response1));
  t.assert(rsp1.code.success);
  const data1 = UpdatePasswordResponse.fromBinary(rsp1.result.value);
  t.is(data1.wallet.accountNonce, 0);

  const request2 = new CheckPasswordRequest({
    password: newPassword,
  });
  const response2 = wallet.checkPassword(request2.toBinary());
  const rsp2 = ApiResponse.fromBinary(new Uint8Array(response2));
  t.assert(rsp2.code.success);
  const data2 = CheckPasswordResponse.fromBinary(rsp2.result.value);
  t.is(data2.wallet.accountNonce, 0);
  t.pass();
});

test('test exportMnemonicPhrase', (t) => {
  InitMystiko();
  createWallet();
  const wallet = new Wallet();
  const request = new ExportMnemonicPhraseRequest({
    password: WalletPassword,
  });
  const response = wallet.exportMnemonicPhrase(request.toBinary());
  const rsp = ApiResponse.fromBinary(new Uint8Array(response));
  t.assert(rsp.code.success);
  const data = ExportMnemonicPhraseResponse.fromBinary(rsp.result.value);
  t.is(data.mnemonicPhrase, WalletMnemonicPhrase);
  t.pass();
});
