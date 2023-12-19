import { Config } from "@mystikonetwork/napi";
import { api } from "@mystikonetwork/protos";
import { buildErrorResponse } from "../common";

export class MystikoConfig {
  private readonly config: Config;

  constructor() {
    this.config = new Config();
  }

  get(): Promise<api.v1.GetConfigResponse> {
    const response = this.config.get();
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.GetConfigResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findDefaultCircuit(
    request: api.v1.FindDefaultCircuitRequest,
  ): Promise<api.v1.FindDefaultCircuitResponse> {
    const response = this.config.findDefaultCircuit(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindDefaultCircuitResponse.fromBinary(
        rsp.result.value,
      );
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findCircuit(
    request: api.v1.FindCircuitRequest,
  ): Promise<api.v1.FindCircuitResponse> {
    const response = this.config.findCircuit(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindCircuitResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findChain(
    request: api.v1.FindChainRequest,
  ): Promise<api.v1.FindChainResponse> {
    const response = this.config.findChain(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindChainResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findPeerChains(
    request: api.v1.FindPeerChainsRequest,
  ): Promise<api.v1.FindPeerChainsResponse> {
    const response = this.config.findPeerChains(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindPeerChainsResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findAssetSymbols(
    request: api.v1.FindAssetSymbolsRequest,
  ): Promise<api.v1.FindAssetSymbolsResponse> {
    const response = this.config.findAssetSymbols(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindAssetSymbolsResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findBridges(
    request: api.v1.FindBridgesRequest,
  ): Promise<api.v1.FindBridgesResponse> {
    const response = this.config.findBridges(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindBridgesResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findBridge(
    request: api.v1.FindBridgeRequest,
  ): Promise<api.v1.FindBridgeResponse> {
    const response = this.config.findBridge(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindBridgeResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findDepositContract(
    request: api.v1.FindDepositContractRequest,
  ): Promise<api.v1.FindDepositContractResponse> {
    const response = this.config.findDepositContract(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindDepositContractResponse.fromBinary(
        rsp.result.value,
      );
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findDepositContractByAddress(
    request: api.v1.FindDepositContractByAddressRequest,
  ): Promise<api.v1.FindDepositContractByAddressResponse> {
    const response = this.config.findDepositContractByAddress(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindDepositContractByAddressResponse.fromBinary(
        rsp.result.value,
      );
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findPoolContract(
    request: api.v1.FindPoolContractRequest,
  ): Promise<api.v1.FindPoolContractResponse> {
    const response = this.config.findPoolContract(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindPoolContractResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findPoolContracts(
    request: api.v1.FindPoolContractsRequest,
  ): Promise<api.v1.FindPoolContractsResponse> {
    const response = this.config.findPoolContracts(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindPoolContractsResponse.fromBinary(
        rsp.result.value,
      );
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findPoolContractByAddress(
    request: api.v1.FindPoolContractByAddressRequest,
  ): Promise<api.v1.FindPoolContractByAddressResponse> {
    const response = this.config.findPoolContractByAddress(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindPoolContractByAddressResponse.fromBinary(
        rsp.result.value,
      );
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findContractByAddress(
    request: api.v1.FindContractByAddressRequest,
  ): Promise<api.v1.FindContractByAddressResponse> {
    const response = this.config.findContractByAddress(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindContractByAddressResponse.fromBinary(
        rsp.result.value,
      );
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  getTransactionUrl(
    request: api.v1.GetTransactionUrlRequest,
  ): Promise<api.v1.GetTransactionUrlResponse> {
    const response = this.config.getTransactionUrl(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.GetTransactionUrlResponse.fromBinary(
        rsp.result.value,
      );
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }
}
