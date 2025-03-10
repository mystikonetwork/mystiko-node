import { Scanner } from '@mystikonetwork/napi';
import { api, core } from '@mystikonetwork/protos';
import { buildEmptyDataResponse, buildErrorResponse } from '../common';

export class MystikoNodeScanner {
  private readonly scanner: Scanner;

  constructor() {
    this.scanner = new Scanner();
  }

  public sync(options: core.scanner.v1.ScannerSyncOptions): core.scanner.v1.ScannerSyncResult {
    options.concurrency = 1;
    const request = new api.scanner.v1.ScannerScanRequest({
      options,
    });
    const response = this.scanner.sync(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.scanner.v1.ScannerSyncResponse.fromBinary(rsp.result.value);
      if (data.result) {
        return data.result;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public scan(options: core.scanner.v1.ScannerScanOptions): core.scanner.v1.ScannerScanResult {
    options.concurrency = 1;
    const request = new api.scanner.v1.ScannerSyncRequest({
      options,
    });
    const response = this.scanner.scan(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.scanner.v1.ScannerScanResponse.fromBinary(rsp.result.value);
      if (data.result) {
        return data.result;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public reset(options: core.scanner.v1.ScannerResetOptions): core.scanner.v1.ScannerResetResult {
    const request = new api.scanner.v1.ScannerResetRequest({
      options,
    });
    const response = this.scanner.reset(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.scanner.v1.ScannerResetResponse.fromBinary(rsp.result.value);
      if (data.result) {
        return data.result;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public import(options: core.scanner.v1.AssetImportOptions): core.scanner.v1.AssetImportResult {
    const request = new api.scanner.v1.ScannerAssetImportRequest({
      options,
    });
    const response = this.scanner.import(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.scanner.v1.ScannerAssetImportResponse.fromBinary(rsp.result.value);
      if (data.result) {
        return data.result;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public balance(options: core.scanner.v1.BalanceOptions): core.scanner.v1.BalanceResult {
    const request = new api.scanner.v1.BalanceRequest({
      options,
    });
    const response = this.scanner.balance(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.scanner.v1.BalanceResponse.fromBinary(rsp.result.value);
      if (data.result) {
        return data.result;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public assets(options: core.scanner.v1.AssetsOptions): core.scanner.v1.AssetsByChain[] {
    const request = new api.scanner.v1.AssetsRequest({
      options,
    });
    const response = this.scanner.assets(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.scanner.v1.AssetsResponse.fromBinary(rsp.result.value);
      if (data.results) {
        return data.results;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public chainAssets(
    chainId: bigint,
    options: core.scanner.v1.AssetsOptions,
  ): core.scanner.v1.AssetsByChain | undefined {
    const request = new api.scanner.v1.ChainAssetsRequest({
      chainId,
      options,
    });
    const response = this.scanner.chainAssets(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.scanner.v1.ChainAssetsResponse.fromBinary(rsp.result.value);
      return data.result;
    } else {
      throw buildErrorResponse(rsp);
    }
  }
}
