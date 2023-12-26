import { Config as NapiConfig } from '@mystikonetwork/napi';
import { api, config, common } from '@mystikonetwork/protos';
import { buildEmptyDataResponse, buildErrorResponse } from '../common';

export class MystikoNodeConfig {
  private readonly config: NapiConfig;

  constructor() {
    this.config = new NapiConfig();
  }

  public get(): config.v1.MystikoConfig {
    const response = this.config.get();
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.GetConfigResponse.fromBinary(rsp.result.value);
      if (data.config) {
        return data.config;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findDefaultCircuit(circuitType: common.v1.CircuitType): config.v1.CircuitConfig {
    const request = new api.config.v1.FindDefaultCircuitRequest({
      circuitType,
    });
    const response = this.config.findDefaultCircuit(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindDefaultCircuitResponse.fromBinary(rsp.result.value);
      if (data.config) {
        return data.config;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findCircuit(circuitName: string): config.v1.CircuitConfig {
    const request = new api.config.v1.FindCircuitRequest({
      circuitName,
    });
    const response = this.config.findCircuit(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindCircuitResponse.fromBinary(rsp.result.value);
      if (data.config) {
        return data.config;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findChain(chainId: bigint): config.v1.ChainConfig {
    const request = new api.config.v1.FindChainRequest({
      chainId,
    });
    const response = this.config.findChain(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindChainResponse.fromBinary(rsp.result.value);
      if (data.config) {
        return data.config;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findPeerChains(peerChainId: bigint): config.v1.ChainConfig[] {
    const request = new api.config.v1.FindPeerChainsRequest({
      chainId: peerChainId,
    });
    const response = this.config.findPeerChains(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindPeerChainsResponse.fromBinary(rsp.result.value);
      if (data.configs) {
        return data.configs;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findAssetSymbols(chainId: bigint, peerChainId: bigint): string[] {
    const request = new api.config.v1.FindAssetSymbolsRequest({
      chainId,
      peerChainId,
    });
    const response = this.config.findAssetSymbols(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindAssetSymbolsResponse.fromBinary(rsp.result.value);
      if (data.assetSymbol) {
        return data.assetSymbol;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findBridges(chainId: bigint, peerChainId: bigint, assetSymbol: string): common.v1.BridgeType[] {
    const request = new api.config.v1.FindBridgesRequest({
      chainId,
      peerChainId,
      assetSymbol,
    });
    const response = this.config.findBridges(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindBridgesResponse.fromBinary(rsp.result.value);
      if (data.bridgeType) {
        return data.bridgeType;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findBridge(bridgeType: common.v1.BridgeType): config.bridge.v1.BridgeConfig {
    const request = new api.config.v1.FindBridgeRequest({
      bridgeType,
    });
    const response = this.config.findBridge(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindBridgeResponse.fromBinary(rsp.result.value);
      if (data.config) {
        return data.config;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findDepositContract(
    chainId: bigint,
    peerChainId: bigint,
    assetSymbol: string,
    bridgeType: common.v1.BridgeType,
  ): config.contract.v1.DepositContractConfig {
    const request = new api.config.v1.FindDepositContractRequest({
      chainId,
      peerChainId,
      assetSymbol,
      bridgeType,
    });
    const response = this.config.findDepositContract(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindDepositContractResponse.fromBinary(rsp.result.value);
      if (data.config) {
        return data.config;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findDepositContractByAddress(
    chainId: bigint,
    address: string,
  ): config.contract.v1.DepositContractConfig {
    const request = new api.config.v1.FindDepositContractByAddressRequest({
      chainId,
      address,
    });
    const response = this.config.findDepositContractByAddress(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindDepositContractByAddressResponse.fromBinary(rsp.result.value);
      if (data.config) {
        return data.config;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findPoolContract(
    chainId: bigint,
    assetSymbol: string,
    bridgeType: common.v1.BridgeType,
    version: number,
  ): config.contract.v1.PoolContractConfig {
    const request = new api.config.v1.FindPoolContractRequest({
      chainId,
      assetSymbol,
      bridgeType,
      version,
    });
    const response = this.config.findPoolContract(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindPoolContractResponse.fromBinary(rsp.result.value);
      if (data.config) {
        return data.config;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findPoolContracts(
    chainId: bigint,
    assetSymbol: string,
    bridgeType: common.v1.BridgeType,
  ): config.contract.v1.PoolContractConfig[] {
    const request = new api.config.v1.FindPoolContractsRequest({
      chainId,
      assetSymbol,
      bridgeType,
    });
    const response = this.config.findPoolContracts(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindPoolContractsResponse.fromBinary(rsp.result.value);
      if (data.config) {
        return data.config;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findPoolContractByAddress(chainId: bigint, address: string): config.contract.v1.PoolContractConfig {
    const request = new api.config.v1.FindPoolContractByAddressRequest({
      chainId,
      address,
    });
    const response = this.config.findPoolContractByAddress(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindPoolContractByAddressResponse.fromBinary(rsp.result.value);
      if (data.config) {
        return data.config;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findContractByAddress(chainId: bigint, address: string): config.contract.v1.ContractConfig {
    const request = new api.config.v1.FindContractByAddressRequest({
      chainId,
      address,
    });
    const response = this.config.findContractByAddress(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.FindContractByAddressResponse.fromBinary(rsp.result.value);
      if (data.config) {
        return data.config;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public getTransactionUrl(chainId: bigint, txHash: string): string {
    const request = new api.config.v1.GetTransactionUrlRequest({
      chainId,
      txHash,
    });
    const response = this.config.getTransactionUrl(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.config.v1.GetTransactionUrlResponse.fromBinary(rsp.result.value);
      if (data.url) {
        return data.url;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }
}
