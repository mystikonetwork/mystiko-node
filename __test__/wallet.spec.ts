import { api } from '@mystikonetwork/protos'
import test from 'ava'

import { Wallet } from '../index'

import { InitMystiko, createWallet, WalletPassword, WalletMnemonicPhrase } from './base'

const { CreateWalletResponse } = api.v1
const { CheckCurrentRequest, CheckCurrentResponse } = api.v1
const { CheckPasswordRequest, CheckPasswordResponse } = api.v1
const { ExportMnemonicPhraseRequest, ExportMnemonicPhraseResponse } = api.v1
const { ApiResponse } = api.v1

test('test create', (t) => {
  InitMystiko()
  const response = createWallet()
  const rsp = ApiResponse.fromBinary(response)
  t.assert(rsp.code.success)
  const data = CreateWalletResponse.fromBinary(rsp.result.value)
  t.is(data.wallet.accountNonce, 0)
  t.pass()
})

test('test checkCurrent', (t) => {
  InitMystiko()
  createWallet()
  const wallet = new Wallet()
  const request = new CheckCurrentRequest({})
  const response = wallet.checkCurrent(request.toBinary())
  const rsp = ApiResponse.fromBinary(response)
  t.assert(rsp.code.success)
  const data = CheckCurrentResponse.fromBinary(rsp.result.value)
  t.is(data.wallet.accountNonce, 0)
  t.pass()
})

test('test checkPassword', (t) => {
  InitMystiko()
  createWallet()
  const wallet = new Wallet()
  const request = new CheckPasswordRequest({
    password: WalletPassword,
  })
  const response = wallet.checkPassword(request.toBinary())
  const rsp = ApiResponse.fromBinary(response)
  t.assert(rsp.code.success)
  const data = CheckPasswordResponse.fromBinary(rsp.result.value)
  t.is(data.wallet.accountNonce, 0)
  t.pass()
})

test('test exportMnemonicPhrase', (t) => {
  InitMystiko()
  createWallet()
  const wallet = new Wallet()
  const request = new ExportMnemonicPhraseRequest({
    password: WalletPassword,
  })
  const response = wallet.exportMnemonicPhrase(request.toBinary())
  const rsp = ApiResponse.fromBinary(response)
  t.assert(rsp.code.success)
  const data = ExportMnemonicPhraseResponse.fromBinary(rsp.result.value)
  t.is(data.mnemonicPhrase, WalletMnemonicPhrase)
  t.pass()
})
