import { api, core, storage } from '@mystikonetwork/protos'
import test from 'ava'

import { Account } from '../index'

import { InitMystiko, createWallet, createAccount, WalletPassword } from './base'

const { CreateAccountResponse } = api.v1
const { CountAccountRequest, CountAccountResponse } = api.v1
const { FindAccountRequest, FindAccountResponse } = api.v1
const { FindAccountByIdentifierRequest, FindAccountByIdentifierResponse } = api.v1
const { UpdateAccountRequest, UpdateAccountResponse } = api.v1
const { UpdateEncryptionRequest, UpdateEncryptionResponse } = api.v1
const { ExportSecretKeyRequest, ExportSecretKeyResponse } = api.v1
const { UpdateAccountOptions } = core.handler.v1
const { QueryFilter, ConditionOperator } = storage.v1
const { ApiResponse } = api.v1

test('test create', (t) => {
  InitMystiko()
  createWallet()
  const response = createAccount()
  const rsp = ApiResponse.fromBinary(response)
  t.assert(rsp.code.success)
  const data = CreateAccountResponse.fromBinary(rsp.result.value)
  t.is(data.account.name, 'test_create_account')
  t.pass()
})

test('test count', (t) => {
  InitMystiko()
  createWallet()
  createAccount()

  const account = new Account()
  const request = new CountAccountRequest({
    filter: new QueryFilter({
      conditions: [],
      conditionsOperator: ConditionOperator.OR,
    }),
  })
  const response = account.count(request.toBinary())
  const rsp = ApiResponse.fromBinary(response)
  t.assert(rsp.code.success)
  const data = CountAccountResponse.fromBinary(rsp.result.value)
  t.is(data.count, BigInt(1))
  t.pass()
})

test('test find', (t) => {
  InitMystiko()
  createWallet()
  createAccount()

  const account = new Account()
  const request = new FindAccountRequest({
    condition: {
      value: true,
      case: 'findAll',
    },
  })
  const response = account.find(request.toBinary())
  const rsp = ApiResponse.fromBinary(response)
  t.assert(rsp.code.success)
  const data = FindAccountResponse.fromBinary(rsp.result.value)
  t.is(data.account.length, 1)
  t.is(data.account[0].name, 'test_create_account')
  t.pass()
})

test('test FindAccountByIdentifierRequest', (t) => {
  InitMystiko()
  createWallet()
  createAccount()

  const account = new Account()
  const request = new FindAccountRequest({
    condition: {
      value: true,
      case: 'findAll',
    },
  })
  const response = account.find(request.toBinary())
  const rsp = ApiResponse.fromBinary(response)
  t.assert(rsp.code.success)
  const data = FindAccountResponse.fromBinary(rsp.result.value)

  const request2 = new FindAccountByIdentifierRequest({
    identifier: {
      value: data.account[0].id,
      case: 'id',
    },
  })
  const response2 = account.findByIdentifier(request2.toBinary())
  const rsp2 = ApiResponse.fromBinary(response2)
  t.assert(rsp2.code.success)
  const data2 = FindAccountByIdentifierResponse.fromBinary(rsp2.result.value)
  t.is(data2.account.name, 'test_create_account')
  t.pass()
})

test('test update', (t) => {
  InitMystiko()
  createWallet()
  createAccount()

  const account = new Account()
  const request = new FindAccountRequest({
    condition: {
      value: true,
      case: 'findAll',
    },
  })
  const response = account.find(request.toBinary())
  const rsp = ApiResponse.fromBinary(response)
  t.assert(rsp.code.success)
  const data = FindAccountResponse.fromBinary(rsp.result.value)

  const request2 = new UpdateAccountRequest({
    identifier: {
      value: data.account[0].id,
      case: 'id',
    },
    options: new UpdateAccountOptions({
      walletPassword: WalletPassword,
      name: 'new account by update',
    }),
  })
  const response2 = account.update(request2.toBinary())
  const rsp2 = ApiResponse.fromBinary(response2)
  t.assert(rsp2.code.success)
  const data2 = UpdateAccountResponse.fromBinary(rsp2.result.value)
  t.is(data2.account.name, 'new account by update')
  t.pass()
})

test('test updateEncryption', (t) => {
  InitMystiko()
  createWallet()
  createAccount()

  const account = new Account()
  const request = new UpdateEncryptionRequest({
    oldWalletPassword: WalletPassword,
    newWalletPassword: '123@ABC',
  })
  const response = account.updateEncryption(request.toBinary())
  const rsp = ApiResponse.fromBinary(response)
  t.assert(rsp.code.success)
  const data = UpdateEncryptionResponse.fromBinary(rsp.result.value)
  t.is(data.account.length, 1)
  t.is(data.account[0].name, 'test_create_account')
  t.pass()
})

test('test exportSecretKey', (t) => {
  InitMystiko()
  createWallet()
  createAccount()

  const account = new Account()
  const request = new FindAccountRequest({
    condition: {
      value: true,
      case: 'findAll',
    },
  })
  const response = account.find(request.toBinary())
  const rsp = ApiResponse.fromBinary(response)
  t.assert(rsp.code.success)
  const data = FindAccountResponse.fromBinary(rsp.result.value)

  const request2 = new ExportSecretKeyRequest({
    identifier: {
      value: data.account[0].id,
      case: 'id',
    },
    walletPassword: WalletPassword,
  })
  const response2 = account.exportSecretKey(request2.toBinary())
  const rsp2 = ApiResponse.fromBinary(response2)
  t.assert(rsp2.code.success)
  const data2 = ExportSecretKeyResponse.fromBinary(rsp2.result.value)
  t.assert(data2.secretKey.length > 10)
  t.pass()
})
