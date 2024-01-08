import { core, common, service, storage, api } from '@mystikonetwork/protos';
import mystiko from '../../src';
import { createAccount, createWallet, initMystiko, WalletPassword } from '../common/base';

beforeAll(() => {
  initMystiko();
  createWallet();
  createAccount();
});

test('test quote', () => {
  const options = new core.handler.v1.QuoteSpendOptions({
    chainId: BigInt(5),
    assetSymbol: 'MTT',
    bridgeType: common.v1.BridgeType.TBRIDGE,
  });
  const response = mystiko.spend?.quote(options);
  expect(response).toBeDefined();
  expect(response?.valid).toBe(false);

  const options2 = new core.handler.v1.QuoteSpendOptions({
    chainId: BigInt(5),
    assetSymbol: 'WrongToken',
    bridgeType: common.v1.BridgeType.TBRIDGE,
  });
  expect(() => {
    mystiko.spend?.quote(options2);
  }).toThrow();
});

test('test summary', () => {
  const options = new core.handler.v1.CreateSpendOptions({
    chainId: BigInt(5),
    assetSymbol: 'MTT',
    amount: 1,
    spendType: core.v1.SpendType.WITHDRAW,
    bridgeType: common.v1.BridgeType.TBRIDGE,
  });

  expect(() => {
    mystiko.spend?.summary(options);
  }).toThrow();
});

test('test create', () => {
  const options = new core.handler.v1.CreateSpendOptions({
    chainId: BigInt(5),
    assetSymbol: 'MTT',
    amount: 1,
    bridgeType: common.v1.BridgeType.TBRIDGE,
    walletPassword: WalletPassword,
  });
  expect(() => {
    mystiko.spend?.create(options);
  }).toThrow();
});

test('test send', () => {
  const options1 = new core.handler.v1.SendSpendOptions({
    spendId: '0x123456',
    walletPassword: WalletPassword,
  });
  try {
    mystiko.spend?.send(options1);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('Spend(id=0x123456) is not found');
    } else {
      throw e;
    }
  }
});

test('test sendWithGrpc', () => {
  const options1 = new core.handler.v1.SendSpendOptions({
    spendId: '0x123456',
    walletPassword: WalletPassword,
  });
  const options2 = new service.v1.ClientOptions({});
  try {
    mystiko.spend?.sendWithGrpc(options1, options2);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('Spend(id=0x123456) is not found');
    } else {
      throw e;
    }
  }
});

test('test find', () => {
  const response = mystiko.spend?.find();
  expect(response).toBeDefined();
  expect(response?.length).toBe(0);

  const filter1 = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });
  const response1 = mystiko.spend?.find(filter1);
  expect(response1).toBeDefined();
  expect(response1?.length).toBe(0);

  const filter2 = new storage.v1.Condition({
    subFilters: [],
    operator: storage.v1.ConditionOperator.OR,
  });
  const response2 = mystiko.spend?.find(filter2);
  expect(response2).toBeDefined();
  expect(response2?.length).toBe(0);

  const filter3 = new storage.v1.SubFilter({
    column: 'id',
    values: [],
    operator: storage.v1.SubFilterOperator.IS_NOT_NULL,
  });
  const response3 = mystiko.spend?.find(filter3);
  expect(response3).toBeDefined();
  expect(response3?.length).toBe(0);
});

test('test findOne', () => {
  const filter1 = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });
  try {
    mystiko.spend?.findOne(filter1);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('empty data error');
    } else {
      throw e;
    }
  }

  const filter2 = new storage.v1.Condition({
    subFilters: [],
    operator: storage.v1.ConditionOperator.OR,
  });
  try {
    mystiko.spend?.findOne(filter2);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('empty data error');
    } else {
      throw e;
    }
  }

  const filter3 = new storage.v1.SubFilter({
    column: 'id',
    values: [],
    operator: storage.v1.SubFilterOperator.IS_NOT_NULL,
  });
  try {
    mystiko.spend?.findOne(filter3);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('empty data error');
    } else {
      throw e;
    }
  }
});

test('test findById', () => {
  const id = '0x123';
  try {
    mystiko.spend?.findById(id);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('empty data error');
    } else {
      throw e;
    }
  }
});

test('test count', () => {
  try {
    mystiko.spend?.count();
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('empty data error');
    } else {
      throw e;
    }
  }

  const filter1 = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });
  try {
    mystiko.spend?.count(filter1);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('empty data error');
    } else {
      throw e;
    }
  }

  const filter2 = new storage.v1.Condition({
    subFilters: [],
    operator: storage.v1.ConditionOperator.OR,
  });
  try {
    mystiko.spend?.count(filter2);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('empty data error');
    } else {
      throw e;
    }
  }

  const filter3 = new storage.v1.SubFilter({
    column: 'id',
    values: [],
    operator: storage.v1.SubFilterOperator.IS_NOT_NULL,
  });
  try {
    mystiko.spend?.count(filter3);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('empty data error');
    } else {
      throw e;
    }
  }
});

test('test update', () => {
  const spend = new core.document.v1.Spend({
    id: '0x123',
  });
  expect(() => {
    mystiko.spend?.update(spend);
  }).toThrow();
});

test('test updateBatch', () => {
  const spend = new core.document.v1.Spend({
    id: '0x123',
  });
  expect(() => {
    mystiko.spend?.updateBatch([spend]);
  }).toThrow();
});

test('test update by filter', () => {
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
  const response1 = mystiko.spend?.updateByValues(columnValues, filter);
  expect(response1).toBeUndefined();
});

test('test update all', () => {
  expect(() => {
    mystiko.spend?.updateByValues([], undefined);
  }).toThrow();
});

test('test delete', () => {
  const spend = new core.document.v1.Spend({
    id: '0x123',
  });
  expect(() => {
    mystiko.spend?.delete(spend);
  }).toThrow();
});

test('test delete batch', () => {
  const spend = new core.document.v1.Spend({
    id: '0x123',
  });
  expect(() => {
    mystiko.spend?.deleteBatch([spend]);
  }).toThrow();
});

test('test delete all', () => {
  const response = mystiko.spend?.deleteAll();
  expect(response).toBeUndefined();
});

test('test delete by filter', () => {
  const filter = new storage.v1.QueryFilter({
    conditions: [],
    conditionsOperator: storage.v1.ConditionOperator.OR,
  });

  const response = mystiko.spend?.deleteByFilter(filter);
  expect(response).toBeUndefined();
});
