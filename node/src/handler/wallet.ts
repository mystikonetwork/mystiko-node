import { Wallet } from "@mystikonetwork/napi";
import { api } from "@mystikonetwork/protos";
import { buildErrorResponse } from "../common";

export class MystikoWallet {
  private readonly wallet: Wallet;

  constructor() {
    this.wallet = new Wallet();
  }

  create(
    request: api.v1.CreateWalletRequest,
  ): Promise<api.v1.CreateWalletResponse> {
    const response = this.wallet.create(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.CreateWalletResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  checkCurrent(): Promise<api.v1.CheckCurrentResponse> {
    const response = this.wallet.checkCurrent();
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.CheckCurrentResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  checkPassword(
    request: api.v1.CheckPasswordRequest,
  ): Promise<api.v1.CheckPasswordResponse> {
    const response = this.wallet.checkPassword(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.CheckPasswordResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  updatePassword(
    request: api.v1.UpdatePasswordRequest,
  ): Promise<api.v1.UpdatePasswordResponse> {
    const response = this.wallet.updatePassword(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.UpdatePasswordResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  exportMnemonicPhrase(
    request: api.v1.ExportMnemonicPhraseRequest,
  ): Promise<api.v1.ExportMnemonicPhraseResponse> {
    const response = this.wallet.exportMnemonicPhrase(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.ExportMnemonicPhraseResponse.fromBinary(
        rsp.result.value,
      );
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }
}
