import { core, common, service, storage, api } from '@mystikonetwork/protos';
import mystiko from '../../src';
import { createAccount, createWallet, initMystiko } from '../common/base';

beforeAll(() => {
  initMystiko();
  createWallet();
  createAccount();
});

test('test quote', () => {
  const options = new core.handler.v1.QuoteDepositOptions({
    chainId: BigInt(11155111),
    assetSymbol: 'MTT',
    dstChainId: BigInt(11155111),
    bridgeType: common.v1.BridgeType.LOOP,
  });
  const response = mystiko.deposit?.quote(options);
  expect(response).toBeDefined();
  expect(response?.assetSymbol).toBe('MTT');
  expect(response?.assetDecimals).toBe(18);
  expect(response?.minAmount).toBe(0.1);

  const options2 = new core.handler.v1.QuoteDepositOptions({
    chainId: BigInt(11155111),
    assetSymbol: 'MTT',
    dstChainId: BigInt(11155111),
    bridgeType: common.v1.BridgeType.TBRIDGE,
  });
  expect(() => {
    mystiko.deposit?.quote(options2);
  }).toThrow();
});

test('test summary', () => {
  const options1 = new core.handler.v1.CreateDepositOptions({
    chainId: BigInt(11155111),
    assetSymbol: 'MTT',
    amount: 1,
    shieldedAddress:
      '13hMt2P6h8zp5t8Cxm5oAzTULg1boVEvzjaEPXmLtSBUmF4KKnaooWkBKBqZs9BYncvY6rA6TpCkAJ6cEXFEHWMHt',
    dstChainId: BigInt(11155111),
    bridgeType: common.v1.BridgeType.LOOP,
  });
  const response1 = mystiko.deposit?.summary(options1);
  expect(response1).toBeDefined();
  expect(response1?.assetSymbol).toBe('MTT');
  expect(response1?.amount).toBe(1);

  const options2 = new core.handler.v1.CreateDepositOptions({
    chainId: BigInt(11155111),
    assetSymbol: 'MTT',
    dstChainId: BigInt(11155111),
    bridgeType: common.v1.BridgeType.TBRIDGE,
  });
  expect(() => {
    mystiko.deposit?.summary(options2);
  }).toThrow();
});

test('test create', () => {
  const options1 = new core.handler.v1.CreateDepositOptions({
    chainId: BigInt(11155111),
    assetSymbol: 'MTT',
    amount: 1,
    shieldedAddress:
      '13hMt2P6h8zp5t8Cxm5oAzTULg1boVEvzjaEPXmLtSBUmF4KKnaooWkBKBqZs9BYncvY6rA6TpCkAJ6cEXFEHWMHt',
    dstChainId: BigInt(11155111),
    bridgeType: common.v1.BridgeType.LOOP,
  });
  const response1 = mystiko.deposit?.create(options1);
  expect(response1).toBeDefined();
  expect(response1?.assetSymbol).toBe('MTT');
  expect(response1?.amount).toBe(1);
  mystiko.deposit?.deleteAll();

  const options2 = new core.handler.v1.CreateDepositOptions({
    chainId: BigInt(11155111),
    assetSymbol: 'MTT',
    dstChainId: BigInt(11155111),
    bridgeType: common.v1.BridgeType.TBRIDGE,
  });
  expect(() => {
    mystiko.deposit?.create(options2);
  }).toThrow();
});

test('test send', () => {
  const options1 = new core.handler.v1.SendDepositOptions({
    depositId: '0x123456',
  });
  try {
    mystiko.deposit?.send(options1);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('missing private key');
    } else {
      throw e;
    }
  }
});

test('test sendWithGrpc', () => {
  const options1 = new core.handler.v1.SendDepositOptions({
    depositId: '0x123456',
  });
  const options2 = new service.v1.ClientOptions({});
  try {
    mystiko.deposit?.sendWithGrpc(options1, options2);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('deposit with id 0x123456 not found');
    } else {
      throw e;
    }
  }
});

test('test find', () => {
  createDefaultDeposit();

  const response0 = mystiko.deposit?.find();
  expect(response0).toBeDefined();
  expect(response0?.length).toBe(1);
  expect(response0?.[0].chainId).toBe(BigInt(11155111));
  expect(response0?.[0].dstChainId).toBe(BigInt(11155111));

  const filter1 = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });
  const response1 = mystiko.deposit?.find(filter1);
  expect(response1).toBeDefined();
  expect(response1?.length).toBe(1);
  expect(response1?.[0].chainId).toBe(BigInt(11155111));
  expect(response1?.[0].dstChainId).toBe(BigInt(11155111));

  const filter2 = new storage.v1.Condition({
    subFilters: [],
    operator: storage.v1.ConditionOperator.OR,
  });
  const response2 = mystiko.deposit?.find(filter2);
  expect(response2).toBeDefined();
  expect(response2?.length).toBe(1);
  expect(response2?.[0].chainId).toBe(BigInt(11155111));
  expect(response2?.[0].dstChainId).toBe(BigInt(11155111));

  const filter3 = new storage.v1.SubFilter({
    column: 'id',
    values: [],
    operator: storage.v1.SubFilterOperator.IS_NOT_NULL,
  });
  const response3 = mystiko.deposit?.find(filter3);
  expect(response3).toBeDefined();
  expect(response3?.length).toBe(1);
  expect(response3?.[0].chainId).toBe(BigInt(11155111));
  expect(response3?.[0].dstChainId).toBe(BigInt(11155111));
  mystiko.deposit?.deleteAll();
});

test('test findOne', () => {
  createDefaultDeposit();

  const filter1 = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });
  const response1 = mystiko.deposit?.findOne(filter1);
  expect(response1).toBeDefined();
  expect(response1?.chainId).toBe(BigInt(11155111));
  expect(response1?.dstChainId).toBe(BigInt(11155111));

  const filter2 = new storage.v1.Condition({
    subFilters: [],
    operator: storage.v1.ConditionOperator.OR,
  });
  const response2 = mystiko.deposit?.findOne(filter2);
  expect(response2).toBeDefined();
  expect(response2?.chainId).toBe(BigInt(11155111));
  expect(response2?.dstChainId).toBe(BigInt(11155111));

  const filter3 = new storage.v1.SubFilter({
    column: 'id',
    values: [],
    operator: storage.v1.SubFilterOperator.IS_NOT_NULL,
  });
  const response3 = mystiko.deposit?.findOne(filter3);
  expect(response3).toBeDefined();
  expect(response3?.chainId).toBe(BigInt(11155111));
  expect(response3?.dstChainId).toBe(BigInt(11155111));

  mystiko.deposit?.deleteAll();
});

test('test findById', () => {
  createDefaultDeposit();

  const response = mystiko.deposit?.find();
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);
  expect(response?.[0].chainId).toBe(BigInt(11155111));
  expect(response?.[0].dstChainId).toBe(BigInt(11155111));

  const id = response?.[0].id ? response?.[0].id : 'id';
  const response1 = mystiko.deposit?.findById(id);
  expect(response1).toBeDefined();
  expect(response1?.chainId).toBe(BigInt(11155111));
  expect(response1?.dstChainId).toBe(BigInt(11155111));

  mystiko.deposit?.deleteAll();
});

test('test count', () => {
  createDefaultDeposit();

  const response = mystiko.deposit?.count();
  expect(response).toBeDefined();
  expect(response).toBeGreaterThanOrEqual(BigInt(0));

  const filter1 = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });
  const response1 = mystiko.deposit?.count(filter1);
  expect(response1).toBeDefined();
  expect(response1).toBeGreaterThanOrEqual(BigInt(0));

  const filter2 = new storage.v1.Condition({
    subFilters: [],
    operator: storage.v1.ConditionOperator.OR,
  });
  const response2 = mystiko.deposit?.count(filter2);
  expect(response2).toBeDefined();
  expect(response2).toBeGreaterThanOrEqual(BigInt(0));

  const filter3 = new storage.v1.SubFilter({
    column: 'id',
    values: [],
    operator: storage.v1.SubFilterOperator.IS_NOT_NULL,
  });
  const response3 = mystiko.deposit?.count(filter3);
  expect(response3).toBeDefined();
  expect(response3).toBeGreaterThanOrEqual(BigInt(0));

  mystiko.deposit?.deleteAll();
});

test('test update', () => {
  createDefaultDeposit();

  const deposits = mystiko.deposit?.find();
  expect(deposits).toBeDefined();
  expect(deposits?.length).toBe(1);
  expect(deposits?.[0].chainId).toBe(BigInt(11155111));
  expect(deposits?.[0].dstChainId).toBe(BigInt(11155111));

  const deposit = deposits?.[0];
  if (deposit) {
    deposit.amount = 1234567;
    const response1 = mystiko.deposit?.update(deposit);
    expect(response1).toBeDefined();
    expect(response1?.chainId).toBe(BigInt(11155111));
    expect(response1?.dstChainId).toBe(BigInt(11155111));
    expect(response1?.amount).toBe(1234567);
  } else {
    throw new Error('Deposit is undefined');
  }
  mystiko.deposit?.deleteAll();
});

test('test updateBatch', () => {
  createDefaultDeposit();

  const deposits = mystiko.deposit?.find();
  expect(deposits).toBeDefined();
  expect(deposits?.length).toBe(1);
  expect(deposits?.[0].chainId).toBe(BigInt(11155111));
  expect(deposits?.[0].dstChainId).toBe(BigInt(11155111));

  const deposit = deposits?.[0];
  if (deposit) {
    deposit.amount = 7654321;
    const response1 = mystiko.deposit?.updateBatch([deposit]);
    expect(response1).toBeDefined();
    expect(response1?.length).toBe(1);
    expect(response1?.[0].chainId).toBe(BigInt(11155111));
    expect(response1?.[0].dstChainId).toBe(BigInt(11155111));
    expect(response1?.[0].amount).toBe(7654321);
  } else {
    throw new Error('Deposit is undefined');
  }
  mystiko.deposit?.deleteAll();
});

test('test update by filter', () => {
  createDefaultDeposit();

  const columnValues = [
    new api.handler.v1.ColumnValuePair({
      column: 'amount',
      value: new storage.v1.ColumnValue({
        value: {
          value: 88888,
          case: 'f64Value',
        },
      }),
    }),
  ];
  const filter = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });
  const response1 = mystiko.deposit?.updateByValues(columnValues, filter);
  expect(response1).toBeUndefined();

  const deposits = mystiko.deposit?.find();
  expect(deposits).toBeDefined();
  expect(deposits?.length).toBe(1);
  expect(deposits?.[0].amount).toBe(88888);

  mystiko.deposit?.deleteAll();
});

test('test update all', () => {
  createDefaultDeposit();

  const columnValues = [
    new api.handler.v1.ColumnValuePair({
      column: 'amount',
      value: new storage.v1.ColumnValue({
        value: {
          value: 99999,
          case: 'f64Value',
        },
      }),
    }),
  ];
  const response1 = mystiko.deposit?.updateByValues(columnValues, undefined);
  expect(response1).toBeUndefined();

  const deposits = mystiko.deposit?.find();
  expect(deposits).toBeDefined();
  expect(deposits?.length).toBe(1);
  expect(deposits?.[0].amount).toBe(99999);

  mystiko.deposit?.deleteAll();
});

test('test delete', () => {
  createDefaultDeposit();

  const deposits = mystiko.deposit?.find();
  expect(deposits).toBeDefined();
  expect(deposits?.length).toBe(1);
  expect(deposits?.[0].chainId).toBe(BigInt(11155111));
  expect(deposits?.[0].dstChainId).toBe(BigInt(11155111));

  const deposit = deposits?.[0];
  if (deposit) {
    mystiko.deposit?.delete(deposit);
    const deposits = mystiko.deposit?.find();
    expect(deposits).toBeDefined();
    expect(deposits?.length).toBe(0);
  } else {
    throw new Error('Deposit is undefined');
  }

  mystiko.deposit?.deleteAll();
});

test('test delete batch', () => {
  createDefaultDeposit();
  const filter1 = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });
  const deposit = mystiko.deposit?.findOne(filter1);
  expect(deposit).toBeDefined();
  if (deposit) {
    mystiko.deposit?.deleteBatch([deposit]);
    const deposits = mystiko.deposit?.find();
    expect(deposits).toBeDefined();
    expect(deposits?.length).toBe(0);
  }
  mystiko.deposit?.deleteAll();
});

test('test delete all', () => {
  createDefaultDeposit();

  mystiko.deposit?.deleteAll();
  const deposits = mystiko.deposit?.find();
  expect(deposits).toBeDefined();
  expect(deposits?.length).toBe(0);
});

test('test delete by filter', () => {
  createDefaultDeposit();
  const deposits1 = mystiko.deposit?.find();
  expect(deposits1).toBeDefined();
  expect(deposits1?.length).toBe(1);
  const filter = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });
  mystiko.deposit?.deleteByFilter(filter);
  const deposits2 = mystiko.deposit?.find();
  expect(deposits2).toBeDefined();
  expect(deposits2?.length).toBe(0);
});

function createDefaultDeposit() {
  const options1 = new core.handler.v1.CreateDepositOptions({
    chainId: BigInt(11155111),
    assetSymbol: 'MTT',
    amount: 1,
    shieldedAddress:
      '13hMt2P6h8zp5t8Cxm5oAzTULg1boVEvzjaEPXmLtSBUmF4KKnaooWkBKBqZs9BYncvY6rA6TpCkAJ6cEXFEHWMHt',
    dstChainId: BigInt(11155111),
    bridgeType: common.v1.BridgeType.LOOP,
  });
  mystiko.deposit?.create(options1);
}
