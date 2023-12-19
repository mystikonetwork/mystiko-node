import { api, common } from "@mystikonetwork/protos";
import mystiko from "../../src";
import { initMystiko } from "../common/base";

beforeAll(async () => {
  await initMystiko();
});

test("get", async () => {
  const response = await mystiko.config?.get();
  if (!response?.config) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.config.version).toBe("0.1.0");
});

test("find default circuit", async () => {
  const request = new api.v1.FindDefaultCircuitRequest({
    circuitType: common.v1.CircuitType.ROLLUP_4,
  });
  const response = await mystiko.config?.findDefaultCircuit(request);
  if (!response?.config) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.config.name).toBe("zokrates-1.0-rollup4");
  expect(response.config.circuitType).toBe(common.v1.CircuitType.ROLLUP_4);
  expect(response.config.isDefault).toBe(true);
  expect(response.config.programFile).toStrictEqual(["./Rollup4.program.gz"]);
  expect(response.config.abiFile).toStrictEqual(["./Rollup4.abi.json"]);
  expect(response.config.provingKeyFile).toStrictEqual(["./Rollup4.pkey.gz"]);
  expect(response.config.verifyingKeyFile).toStrictEqual(["./Rollup4.vkey.gz"]);
});

test("find circuit", async () => {
  const request = new api.v1.FindCircuitRequest({
    circuitName: "zokrates-1.0-rollup8",
  });
  const response = await mystiko.config?.findCircuit(request);
  if (!response?.config) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.config.name).toBe("zokrates-1.0-rollup8");
  expect(response.config.circuitType).toBe(common.v1.CircuitType.ROLLUP_8);
  expect(response.config.isDefault).toBe(true);
  expect(response.config.programFile).toStrictEqual(["./Rollup8.program.gz"]);
  expect(response.config.abiFile).toStrictEqual(["./Rollup8.abi.json"]);
  expect(response.config.provingKeyFile).toStrictEqual(["./Rollup8.pkey.gz"]);
  expect(response.config.verifyingKeyFile).toStrictEqual(["./Rollup8.vkey.gz"]);
});

test("find chain", async () => {
  const request = new api.v1.FindChainRequest({
    chainId: BigInt(97),
  });
  const response = await mystiko.config?.findChain(request);
  if (!response?.config) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.config.chainId).toBe(BigInt(97));
});

test("find peer chains", async () => {
  const request = new api.v1.FindPeerChainsRequest({
    chainId: BigInt(97),
  });
  const response = await mystiko.config?.findPeerChains(request);
  if (!response?.configs) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.configs.length).toBe(1);
  expect(response.configs[0].chainId).toBe(BigInt(5));
});

test("find asset symbols", async () => {
  const request = new api.v1.FindAssetSymbolsRequest({
    chainId: BigInt(97),
    peerChainId: BigInt(5),
  });
  const response = await mystiko.config?.findAssetSymbols(request);
  if (!response?.assetSymbol) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.assetSymbol.length).toBe(1);
  expect(response.assetSymbol[0]).toBe("MTT");
});

test("find bridge", async () => {
  const request = new api.v1.FindBridgeRequest({
    bridgeType: common.v1.BridgeType.TBRIDGE,
  });
  const response = await mystiko.config?.findBridge(request);
  if (!response?.config) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.config.name).toBe("Mystiko Testnet Bridge");
  expect(response.config.bridgeType).toBe(common.v1.BridgeType.TBRIDGE);
});

test("find bridges", async () => {
  const request = new api.v1.FindBridgesRequest({
    chainId: BigInt(97),
    peerChainId: BigInt(5),
    assetSymbol: "MTT",
  });
  const response = await mystiko.config?.findBridges(request);
  if (!response?.bridgeType) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.bridgeType.length).toBe(4);
});

test("find deposit contract", async () => {
  const request = new api.v1.FindDepositContractRequest({
    chainId: BigInt(5),
    peerChainId: BigInt(97),
    bridgeType: common.v1.BridgeType.TBRIDGE,
    assetSymbol: "MTT",
  });
  const response = await mystiko.config?.findDepositContract(request);
  if (!response?.config) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.config.name).toBe("MystikoV2WithTBridgeERC20");
  expect(response.config.address).toBe(
    "0xbF5605f5Ed6d18ed957cBA80dbA8838dFcb9A69f",
  );
});

test("find deposit contract by address", async () => {
  const request = new api.v1.FindDepositContractByAddressRequest({
    chainId: BigInt(5),
    address: "0xbF5605f5Ed6d18ed957cBA80dbA8838dFcb9A69f",
  });
  const response = await mystiko.config?.findDepositContractByAddress(request);
  if (!response?.config) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.config.name).toBe("MystikoV2WithTBridgeERC20");
  expect(response.config.address).toBe(
    "0xbF5605f5Ed6d18ed957cBA80dbA8838dFcb9A69f",
  );
});

test("find pool contract", async () => {
  const request = new api.v1.FindPoolContractRequest({
    chainId: BigInt(5),
    bridgeType: common.v1.BridgeType.TBRIDGE,
    assetSymbol: "MTT",
    version: 2,
  });
  const response = await mystiko.config?.findPoolContract(request);
  if (!response?.config) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.config.name).toBe("CommitmentPool");
  expect(response.config.address).toBe(
    "0xF55Dbe8D71Df9Bbf5841052C75c6Ea9eA717fc6d",
  );
});

test("find pool contracts", async () => {
  const request = new api.v1.FindPoolContractRequest({
    chainId: BigInt(5),
    bridgeType: common.v1.BridgeType.TBRIDGE,
    assetSymbol: "MTT",
  });
  const response = await mystiko.config?.findPoolContracts(request);
  if (!response?.config) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.config.length).toBe(2);
});

test("find pool contract by address", async () => {
  const request = new api.v1.FindPoolContractByAddressRequest({
    chainId: BigInt(5),
    address: "0xF55Dbe8D71Df9Bbf5841052C75c6Ea9eA717fc6d",
  });
  const response = await mystiko.config?.findPoolContractByAddress(request);
  if (!response?.config) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.config.name).toBe("CommitmentPool");
  expect(response.config.address).toBe(
    "0xF55Dbe8D71Df9Bbf5841052C75c6Ea9eA717fc6d",
  );
});

test("get transaction url", async () => {
  const request = new api.v1.GetTransactionUrlRequest({
    chainId: BigInt(5),
    txHash: "txhash",
  });
  const response = await mystiko.config?.getTransactionUrl(request);
  if (!response) {
    throw new Error("Configuration or configuration details are undefined.");
  }
  expect(response.url).toBe("https://goerli.etherscan.io/tx/txhash");
});
