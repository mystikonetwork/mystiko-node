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
  const response = mystiko.config?.findPeerChains(BigInt(11155111));
  expect(response).toBeDefined();
  expect(response?.length).toBe(2);
});

test('find asset symbols', () => {
  const response = mystiko.config?.findAssetSymbols(BigInt(97), BigInt(11155111));
  expect(response).toBeDefined();
  expect(response?.length).toBe(2);
});

test('find bridge', () => {
  const response = mystiko.config?.findBridge(common.v1.BridgeType.TBRIDGE);
  expect(response).toBeDefined();
  expect(response?.name).toBe('Mystiko Testnet Bridge');
  expect(response?.bridgeType).toBe(common.v1.BridgeType.TBRIDGE);
});

test('find bridges', () => {
  const response = mystiko.config?.findBridges(BigInt(97), BigInt(11155111), 'MTT');
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);
});

test('find deposit contract', () => {
  const response = mystiko.config?.findDepositContract(
    BigInt(11155111),
    BigInt(97),
    'MTT',
    common.v1.BridgeType.TBRIDGE,
  );
  expect(response).toBeDefined();
  expect(response?.name).toBe('MystikoV2TBridgeERC20');
  expect(response?.address).toBe('0x3Df8021381101f4817d092369714554D3FA94bAF');
});

test('find deposit contract by address', () => {
  const response = mystiko.config?.findDepositContractByAddress(
    BigInt(11155111),
    '0x643DD956aC516808538BF979b8440AbcebC3bcdA',
  );
  expect(response).toBeDefined();
  expect(response?.name).toBe('MystikoV2LoopMain');
  expect(response?.address).toBe('0x643DD956aC516808538BF979b8440AbcebC3bcdA');
});

test('find pool contract', () => {
  const response = mystiko.config?.findPoolContract(BigInt(11155111), 'MTT', common.v1.BridgeType.TBRIDGE, 6);
  expect(response).toBeDefined();
  expect(response?.name).toBe('CommitmentPool');
  expect(response?.address).toBe('0x09caD274331021f68d2531b7755AFFfBA060Bc59');
});

test('find pool contracts', () => {
  const response = mystiko.config?.findPoolContracts(BigInt(11155111), 'MTT', common.v1.BridgeType.TBRIDGE);
  expect(response).toBeDefined();
  expect(response?.length).toBe(1);
});

test('find pool contract by address', () => {
  const response = mystiko.config?.findPoolContractByAddress(
    BigInt(11155111),
    '0xAE77941b3bd4d2293E13A9a69E64A0ACFf5bBC55',
  );
  expect(response).toBeDefined();
  expect(response?.name).toBe('CommitmentPool');
  expect(response?.address).toBe('0xAE77941b3bd4d2293E13A9a69E64A0ACFf5bBC55');
});

test('get transaction url', () => {
  const response = mystiko.config?.getTransactionUrl(BigInt(11155111), 'txhash');
  expect(response).toBeDefined();
  expect(response).toBe('https://sepolia.etherscan.io/tx/txhash');
});
