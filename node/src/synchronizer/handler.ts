import { Synchronizer } from '@mystikonetwork/napi';
import { api, core } from '@mystikonetwork/protos';
import { buildEmptyDataResponse, buildErrorResponse } from '../common';

export class MystikoNodeSynchronizer {
  private readonly synchronizer: Synchronizer;

  constructor() {
    this.synchronizer = new Synchronizer();
  }

  public chainSyncedBlock(chainId: bigint): bigint {
    const request = new api.synchronizer.v1.ChainSyncedBlockRequest({
      chainId,
    });
    const response = this.synchronizer.chainSyncedBlock(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.synchronizer.v1.ChainSyncedBlockResponse.fromBinary(rsp.result.value);
      if (data.result) {
        return data.result;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public contractSyncedBlock(chainId: bigint, contractAddress: string): bigint {
    const request = new api.synchronizer.v1.ContractSyncedBlockRequest({
      chainId,
      contractAddress,
    });
    const response = this.synchronizer.contractSyncedBlock(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.synchronizer.v1.ContractSyncedBlockResponse.fromBinary(rsp.result.value);
      if (data.result) {
        return data.result;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public status(withContracts: boolean): core.synchronizer.v1.SynchronizerStatus {
    const request = new api.synchronizer.v1.StatusRequest({
      withContracts,
    });
    const response = this.synchronizer.status(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.synchronizer.v1.StatusResponse.fromBinary(rsp.result.value);
      if (data.status) {
        return data.status;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public sync(options: core.synchronizer.v1.SyncOptions): core.synchronizer.v1.SynchronizerStatus {
    const request = new api.synchronizer.v1.SyncRequest({
      options,
    });
    const response = this.synchronizer.sync(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.synchronizer.v1.StatusResponse.fromBinary(rsp.result.value);
      if (data.status) {
        return data.status;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public reset(options: core.synchronizer.v1.SynchronizerResetOptions) {
    const request = new api.synchronizer.v1.SynchronizerResetRequest({
      options,
    });
    const response = this.synchronizer.reset(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }
}
