import { common } from '@mystikonetwork/protos';
import mystiko from '../../src';
import { initMystiko } from '../common/base';

beforeAll(() => {
  initMystiko();
});

test('get', () => {
  const response = mystiko.config?.get();
  expect(response).toBeDefined();
  expect(response?.version).toBe('0.1.0');
});

test('find default circuit', () => {
  const response = mystiko.config?.findDefaultCircuit(common.v1.CircuitType.ROLLUP_4);
  expect(response).toBeDefined();
  expect(response?.name).toBe('zokrates-1.0-rollup4');
  expect(response?.circuitType).toBe(common.v1.CircuitType.ROLLUP_4);
  expect(response?.isDefault).toBe(true);
  expect(response?.programFile).toStrictEqual(['./Rollup4.program.gz']);
  expect(response?.abiFile).toStrictEqual(['./Rollup4.abi.json']);
  expect(response?.provingKeyFile).toStrictEqual(['./Rollup4.pkey.gz']);
  expect(response?.verifyingKeyFile).toStrictEqual(['./Rollup4.vkey.gz']);
});

test('find circuit', () => {
  const response = mystiko.config?.findCircuit('zokrates-1.0-rollup8');
  expect(response).toBeDefined();
  expect(response?.name).toBe('zokrates-1.0-rollup8');
  expect(response?.circuitType).toBe(common.v1.CircuitType.ROLLUP_8);
  expect(response?.isDefault).toBe(true);
  expect(response?.programFile).toStrictEqual(['./Rollup8.program.gz']);
  expect(response?.abiFile).toStrictEqual(['./Rollup8.abi.json']);
  expect(response?.provingKeyFile).toStrictEqual(['./Rollup8.pkey.gz']);
  expect(response?.verifyingKeyFile).toStrictEqual(['./Rollup8.vkey.gz']);
});

test('find chain', () => {
  const response = mystiko.config?.findChain(BigInt(97));
  expect(response).toBeDefined();
  expect(response?.chainId).toBe(BigInt(97));
});

test('find peer chains', () => {
  const response = mystiko.config?.findPeerChains(BigInt(97));
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);
  expect(response?.[0].chainId).toBe(BigInt(5));
});

test('find asset symbols', () => {
  const response = mystiko.config?.findAssetSymbols(BigInt(97), BigInt(5));
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);
  expect(response?.[0]).toBe('MTT');
});

test('find bridge', () => {
  const response = mystiko.config?.findBridge(common.v1.BridgeType.TBRIDGE);
  expect(response).toBeDefined();
  expect(response?.name).toBe('Mystiko Testnet Bridge');
  expect(response?.bridgeType).toBe(common.v1.BridgeType.TBRIDGE);
});

test('find bridges', () => {
  const response = mystiko.config?.findBridges(BigInt(97), BigInt(5), 'MTT');
  expect(response).toBeDefined();
  expect(response?.length).toBe(4);
});

test('find deposit contract', () => {
  const response = mystiko.config?.findDepositContract(
    BigInt(5),
    BigInt(97),
    'MTT',
    common.v1.BridgeType.TBRIDGE,
  );
  expect(response).toBeDefined();
  expect(response?.name).toBe('MystikoV2WithTBridgeERC20');
  expect(response?.address).toBe('0xbF5605f5Ed6d18ed957cBA80dbA8838dFcb9A69f');
});

test('find deposit contract by address', () => {
  const response = mystiko.config?.findDepositContractByAddress(
    BigInt(5),
    '0xbF5605f5Ed6d18ed957cBA80dbA8838dFcb9A69f',
  );
  expect(response).toBeDefined();
  expect(response?.name).toBe('MystikoV2WithTBridgeERC20');
  expect(response?.address).toBe('0xbF5605f5Ed6d18ed957cBA80dbA8838dFcb9A69f');
});

test('find pool contract', () => {
  const response = mystiko.config?.findPoolContract(BigInt(5), 'MTT', common.v1.BridgeType.TBRIDGE, 2);
  expect(response).toBeDefined();
  expect(response?.name).toBe('CommitmentPool');
  expect(response?.address).toBe('0xF55Dbe8D71Df9Bbf5841052C75c6Ea9eA717fc6d');
});

test('find pool contracts', () => {
  const response = mystiko.config?.findPoolContracts(BigInt(5), 'MTT', common.v1.BridgeType.TBRIDGE);
  expect(response).toBeDefined();
  expect(response?.length).toBe(2);
});

test('find pool contract by address', () => {
  const response = mystiko.config?.findPoolContractByAddress(
    BigInt(5),
    '0xF55Dbe8D71Df9Bbf5841052C75c6Ea9eA717fc6d',
  );
  expect(response).toBeDefined();
  expect(response?.name).toBe('CommitmentPool');
  expect(response?.address).toBe('0xF55Dbe8D71Df9Bbf5841052C75c6Ea9eA717fc6d');
});

test('get transaction url', () => {
  const response = mystiko.config?.getTransactionUrl(BigInt(5), 'txhash');
  expect(response).toBeDefined();
  expect(response).toBe('https://goerli.etherscan.io/tx/txhash');
});
