import { Wallet } from '@mystikonetwork/napi';
import { api, core } from '@mystikonetwork/protos';
import { buildEmptyDataResponse, buildErrorResponse } from '../common';

export class MystikoNodeWallet {
  private readonly wallet: Wallet;

  constructor() {
    this.wallet = new Wallet();
  }

  public create(options: core.handler.v1.CreateWalletOptions): core.document.v1.Wallet {
    const request = new api.handler.v1.CreateWalletRequest({
      options,
    });
    const response = this.wallet.create(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CreateWalletResponse.fromBinary(rsp.result.value);
      if (data.wallet) {
        return data.wallet;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public checkCurrent(): core.document.v1.Wallet {
    const response = this.wallet.checkCurrent();
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CheckCurrentResponse.fromBinary(rsp.result.value);
      if (data.wallet) {
        return data.wallet;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public checkPassword(password: string): core.document.v1.Wallet {
    const request = new api.handler.v1.CheckPasswordRequest({
      password,
    });
    const response = this.wallet.checkPassword(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CheckPasswordResponse.fromBinary(rsp.result.value);
      if (data.wallet) {
        return data.wallet;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public updatePassword(oldPassword: string, newPassword: string): core.document.v1.Wallet {
    const request = new api.handler.v1.UpdatePasswordRequest({
      oldPassword,
      newPassword,
    });
    const response = this.wallet.updatePassword(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.UpdatePasswordResponse.fromBinary(rsp.result.value);
      if (data.wallet) {
        return data.wallet;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public exportMnemonicPhrase(password: string): string {
    const request = new api.handler.v1.ExportMnemonicPhraseRequest({
      password,
    });
    const response = this.wallet.exportMnemonicPhrase(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.ExportMnemonicPhraseResponse.fromBinary(rsp.result.value);
      if (data.mnemonicPhrase) {
        return data.mnemonicPhrase;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }
}
