import { api, common } from "@mystikonetwork/protos";
import test from "ava";
import { Config } from "../index";
import { InitMystiko } from "./base";

const { GetConfigResponse } = api.v1;
const { FindDefaultCircuitRequest, FindDefaultCircuitResponse } = api.v1;
const { FindCircuitRequest, FindCircuitResponse } = api.v1;
const { FindChainRequest, FindChainResponse } = api.v1;
const { FindPeerChainsRequest, FindPeerChainsResponse } = api.v1;
const { FindAssetSymbolsRequest, FindAssetSymbolsResponse } = api.v1;
const { FindBridgesRequest, FindBridgesResponse } = api.v1;
const { FindBridgeRequest, FindBridgeResponse } = api.v1;
const { FindDepositContractRequest, FindDepositContractResponse } = api.v1;
const {
  FindDepositContractByAddressRequest,
  FindDepositContractByAddressResponse,
} = api.v1;
const { FindPoolContractRequest, FindPoolContractResponse } = api.v1;
const { FindPoolContractsRequest, FindPoolContractsResponse } = api.v1;
const { FindPoolContractByAddressRequest, FindPoolContractByAddressResponse } =
  api.v1;
const { FindContractByAddressRequest, FindContractByAddressResponse } = api.v1;
const { GetTransactionUrlRequest, GetTransactionUrlResponse } = api.v1;

const { ApiResponse } = api.v1;
const { CircuitType, BridgeType } = common.v1;

test("test get", (t) => {
  InitMystiko();
  const api = new Config();
  const response = api.get();
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = GetConfigResponse.fromBinary(rsp.result.value);
  t.is(cfg.config.version, "0.1.0");
  t.pass();
});

test("test findDefaultCircuit", (t) => {
  InitMystiko();
  const request = new FindDefaultCircuitRequest({
    circuitType: CircuitType.ROLLUP_1,
  });
  const api = new Config();
  const response = api.findDefaultCircuit(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindDefaultCircuitResponse.fromBinary(rsp.result.value);
  t.is(cfg.config.name, "zokrates-1.0-rollup1");
  t.is(cfg.config.circuitType, CircuitType.ROLLUP_1);
  t.is(cfg.config.isDefault, true);
  t.deepEqual(cfg.config.programFile, ["./Rollup1.program.gz"]);
  t.deepEqual(cfg.config.abiFile, ["./Rollup1.abi.json"]);
  t.deepEqual(cfg.config.provingKeyFile, ["./Rollup1.pkey.gz"]);
  t.deepEqual(cfg.config.verifyingKeyFile, ["./Rollup1.vkey.gz"]);
  t.pass();
});

test("test findCircuit", (t) => {
  const request = new FindCircuitRequest({
    circuitName: "zokrates-1.0-rollup2",
  });
  const api = new Config();
  const response = api.findCircuit(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindCircuitResponse.fromBinary(rsp.result.value);
  t.is(cfg.config.name, "zokrates-1.0-rollup2");
  t.is(cfg.config.circuitType, CircuitType.ROLLUP_2);
  t.is(cfg.config.isDefault, true);
  t.deepEqual(cfg.config.programFile, ["./Rollup2.program.gz"]);
  t.deepEqual(cfg.config.abiFile, ["./Rollup2.abi.json"]);
  t.deepEqual(cfg.config.provingKeyFile, ["./Rollup2.pkey.gz"]);
  t.deepEqual(cfg.config.verifyingKeyFile, ["./Rollup2.vkey.gz"]);
  t.pass();
});

test("test findChain", (t) => {
  const request = new FindChainRequest({
    chainId: BigInt(5),
  });
  const api = new Config();
  const response = api.findChain(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindChainResponse.fromBinary(rsp.result.value);
  t.is(cfg.config.chainId, BigInt(5));
  t.pass();
});

test("test findPeerChains", (t) => {
  const request = new FindPeerChainsRequest({
    chainId: BigInt(5),
  });
  const api = new Config();
  const response = api.findPeerChains(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindPeerChainsResponse.fromBinary(rsp.result.value);
  t.is(cfg.configs.length, 2);
  t.pass();
});

test("test findAssetSymbols", (t) => {
  const request = new FindAssetSymbolsRequest({
    chainId: BigInt(5),
    peerChainId: BigInt(97),
  });
  const api = new Config();
  const response = api.findAssetSymbols(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindAssetSymbolsResponse.fromBinary(rsp.result.value);
  t.is(cfg.assetSymbol.length, 1);
  t.is(cfg.assetSymbol[0], "MTT");
  t.pass();
});

test("test findBridge", (t) => {
  const request = new FindBridgeRequest({
    bridgeType: BridgeType.TBRIDGE,
  });
  const api = new Config();
  const response = api.findBridge(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindBridgeResponse.fromBinary(rsp.result.value);
  t.is(cfg.config.name, "Mystiko Testnet Bridge");
  t.is(cfg.config.bridgeType, BridgeType.TBRIDGE);
  t.pass();
});

test("test findBridges", (t) => {
  const request = new FindBridgesRequest({
    chainId: BigInt(5),
    peerChainId: BigInt(97),
    assetSymbol: "MTT",
  });
  const api = new Config();
  const response = api.findBridges(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindBridgesResponse.fromBinary(rsp.result.value);
  t.is(cfg.bridgeType.length, 4);
  t.pass();
});

test("test findDepositContract", (t) => {
  const request = new FindDepositContractRequest({
    chainId: BigInt(5),
    peerChainId: BigInt(97),
    bridgeType: BridgeType.TBRIDGE,
    assetSymbol: "MTT",
  });
  const api = new Config();
  const response = api.findDepositContract(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindDepositContractResponse.fromBinary(rsp.result.value);
  t.is(cfg.config.name, "MystikoV2WithTBridgeERC20");
  t.is(cfg.config.address, "0xbF5605f5Ed6d18ed957cBA80dbA8838dFcb9A69f");
  t.pass();
});

test("test findDepositContractByAddress", (t) => {
  const request = new FindDepositContractByAddressRequest({
    chainId: BigInt(5),
    address: "0xbF5605f5Ed6d18ed957cBA80dbA8838dFcb9A69f",
  });
  const api = new Config();
  const response = api.findDepositContractByAddress(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindDepositContractByAddressResponse.fromBinary(rsp.result.value);
  t.is(cfg.config.name, "MystikoV2WithTBridgeERC20");
  t.is(cfg.config.address, "0xbF5605f5Ed6d18ed957cBA80dbA8838dFcb9A69f");
  t.pass();
});

test("test findPoolContract", (t) => {
  const request = new FindPoolContractRequest({
    chainId: BigInt(5),
    bridgeType: BridgeType.TBRIDGE,
    assetSymbol: "MTT",
    version: 2,
  });
  const api = new Config();
  const response = api.findPoolContract(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindPoolContractResponse.fromBinary(rsp.result.value);
  t.is(cfg.config.name, "CommitmentPool");
  t.is(cfg.config.address, "0xF55Dbe8D71Df9Bbf5841052C75c6Ea9eA717fc6d");
  t.pass();
});

test("test findPoolContracts", (t) => {
  const request = new FindPoolContractsRequest({
    chainId: BigInt(5),
    bridgeType: BridgeType.TBRIDGE,
    assetSymbol: "MTT",
  });
  const api = new Config();
  const response = api.findPoolContracts(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindPoolContractsResponse.fromBinary(rsp.result.value);
  t.is(cfg.config.length, 2);
  t.pass();
});

test("test findPoolContractByAddress", (t) => {
  const request = new FindPoolContractByAddressRequest({
    chainId: BigInt(5),
    address: "0xF55Dbe8D71Df9Bbf5841052C75c6Ea9eA717fc6d",
  });
  const api = new Config();
  const response = api.findPoolContractByAddress(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindPoolContractByAddressResponse.fromBinary(rsp.result.value);
  t.is(cfg.config.name, "CommitmentPool");
  t.is(cfg.config.address, "0xF55Dbe8D71Df9Bbf5841052C75c6Ea9eA717fc6d");
  t.pass();
});

test("test findContractByAddress", (t) => {
  const request = new FindContractByAddressRequest({
    chainId: BigInt(5),
    address: "0xF55Dbe8D71Df9Bbf5841052C75c6Ea9eA717fc6d",
  });
  const api = new Config();
  const response = api.findContractByAddress(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = FindContractByAddressResponse.fromBinary(rsp.result.value);
  t.is(cfg.config.name, "CommitmentPool");
  t.is(cfg.config.address, "0xF55Dbe8D71Df9Bbf5841052C75c6Ea9eA717fc6d");
  t.pass();
});

test("test getTransactionUrl", (t) => {
  const request = new GetTransactionUrlRequest({
    chainId: BigInt(5),
    txHash: "txhash",
  });
  const api = new Config();
  const response = api.getTransactionUrl(request.toBinary());
  const rsp = ApiResponse.fromBinary(response);
  t.assert(rsp.code.success);
  const cfg = GetTransactionUrlResponse.fromBinary(rsp.result.value);
  t.is(cfg.url, "https://goerli.etherscan.io/tx/txhash");
  t.pass();
});
