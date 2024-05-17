import { Account } from '@mystikonetwork/napi';
import { api, core, storage } from '@mystikonetwork/protos';
import { buildEmptyDataResponse, buildErrorResponse, ConvertToQueryFilter } from '../common';

export class MystikoNodeAccount {
  private readonly account: Account;

  constructor() {
    this.account = new Account();
  }

  public create(options: core.handler.v1.CreateAccountOptions): core.document.v1.Account {
    const request = new api.handler.v1.CreateAccountRequest({
      options,
    });
    const response = this.account.create(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CreateAccountResponse.fromBinary(rsp.result.value);
      if (data.account) {
        return data.account;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public count(filter?: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter): bigint {
    if (filter) {
      return this.countByFilter(filter);
    } else {
      return this.countAll();
    }
  }

  public find(
    filter?: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ): core.document.v1.Account[] {
    if (filter) {
      return this.findByFilter(filter);
    } else {
      return this.findAll();
    }
  }

  public findById(id: string): core.document.v1.Account | undefined {
    const request = new api.handler.v1.FindAccountByIdentifierRequest({
      identifier: id,
    });

    const response = this.account.findById(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindAccountByIdentifierResponse.fromBinary(rsp.result.value);
      if (data.account) {
        return data.account;
      } else {
        return undefined;
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findByPublicKey(publicKey: string): core.document.v1.Account | undefined {
    const request = new api.handler.v1.FindAccountByIdentifierRequest({
      identifier: publicKey,
    });

    const response = this.account.findByPublicKey(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindAccountByIdentifierResponse.fromBinary(rsp.result.value);
      if (data.account) {
        return data.account;
      } else {
        return undefined;
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findByShieldedAddress(shieldedAddress: string): core.document.v1.Account | undefined {
    const request = new api.handler.v1.FindAccountByIdentifierRequest({
      identifier: shieldedAddress,
    });

    const response = this.account.findByShieldedAddress(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindAccountByIdentifierResponse.fromBinary(rsp.result.value);
      if (data.account) {
        return data.account;
      } else {
        return undefined;
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public updateById(
    identifier: string,
    options: core.handler.v1.UpdateAccountOptions,
  ): core.document.v1.Account {
    const request = new api.handler.v1.UpdateAccountRequest({
      options,
      identifier,
    });
    const response = this.account.updateById(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.UpdateAccountResponse.fromBinary(rsp.result.value);
      if (data.account) {
        return data.account;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public updateByPublicKey(
    publicKey: string,
    options: core.handler.v1.UpdateAccountOptions,
  ): core.document.v1.Account {
    const request = new api.handler.v1.UpdateAccountRequest({
      options,
      identifier: publicKey,
    });
    const response = this.account.updateByPublicKey(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.UpdateAccountResponse.fromBinary(rsp.result.value);
      if (data.account) {
        return data.account;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public updateByShieldedAddress(
    shieldedAddress: string,
    options: core.handler.v1.UpdateAccountOptions,
  ): core.document.v1.Account {
    const request = new api.handler.v1.UpdateAccountRequest({
      options,
      identifier: shieldedAddress,
    });
    const response = this.account.updateByShieldedAddress(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.UpdateAccountResponse.fromBinary(rsp.result.value);
      if (data.account) {
        return data.account;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public updateEncryption(oldWalletPassword: string, newWalletPassword: string): core.document.v1.Account[] {
    const request = new api.handler.v1.UpdateEncryptionRequest({
      oldWalletPassword,
      newWalletPassword,
    });
    const response = this.account.updateEncryption(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.UpdateEncryptionResponse.fromBinary(rsp.result.value);
      if (data.account) {
        return data.account;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public exportSecretKeyById(walletPassword: string, identifier: string): string {
    const request = new api.handler.v1.ExportSecretKeyRequest({
      walletPassword,
      identifier,
    });
    const response = this.account.exportSecretKeyById(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.ExportSecretKeyResponse.fromBinary(rsp.result.value);
      if (data.secretKey) {
        return data.secretKey;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public exportSecretKeyByPublicKey(walletPassword: string, publicKey: string): string {
    const request = new api.handler.v1.ExportSecretKeyRequest({
      walletPassword,
      identifier: publicKey,
    });
    const response = this.account.exportSecretKeyByPublicKey(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.ExportSecretKeyResponse.fromBinary(rsp.result.value);
      if (data.secretKey) {
        return data.secretKey;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public exportSecretKeyByShieldedAddress(walletPassword: string, shieldedAddress: string): string {
    const request = new api.handler.v1.ExportSecretKeyRequest({
      walletPassword,
      identifier: shieldedAddress,
    });
    const response = this.account.exportSecretKeyByShieldedAddress(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.ExportSecretKeyResponse.fromBinary(rsp.result.value);
      if (data.secretKey) {
        return data.secretKey;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  private countByFilter(
    filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ): bigint {
    const queryFilter = ConvertToQueryFilter(filter);
    const request = new api.handler.v1.CountAccountRequest({
      filter: queryFilter,
    });
    const response = this.account.count(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CountAccountResponse.fromBinary(rsp.result.value);
      return data.count;
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  private countAll(): bigint {
    const response = this.account.countAll();
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CountAccountResponse.fromBinary(rsp.result.value);
      return data.count;
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  private findByFilter(
    filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ): core.document.v1.Account[] {
    const queryFilter = ConvertToQueryFilter(filter);
    const request = new api.handler.v1.FindAccountRequest({
      filter: queryFilter,
    });
    const response = this.account.find(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindAccountResponse.fromBinary(rsp.result.value);
      if (data.account) {
        return data.account;
      } else {
        return [];
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  private findAll(): core.document.v1.Account[] {
    const response = this.account.findAll();
    const rsp = api.v1.ApiResponse.fromBinary(new Uint8Array(response));
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindAccountResponse.fromBinary(rsp.result.value);
      if (data.account) {
        return data.account;
      } else {
        return [];
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }
}
