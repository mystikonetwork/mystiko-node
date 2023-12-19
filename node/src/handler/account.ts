import { Account } from "@mystikonetwork/napi";
import { api } from "@mystikonetwork/protos";
import { buildErrorResponse } from "../common";

export class MystikoAccount {
  private readonly account: Account;

  constructor() {
    this.account = new Account();
  }

  create(
    request: api.v1.CreateAccountRequest,
  ): Promise<api.v1.CreateAccountResponse> {
    const response = this.account.create(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.CreateAccountResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  count(
    request: api.v1.CountAccountRequest,
  ): Promise<api.v1.CountAccountResponse> {
    const response = this.account.count(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.CountAccountResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  countAll(): Promise<api.v1.CountAccountResponse> {
    const response = this.account.countAll();
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.CountAccountResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  find(
    request: api.v1.FindAccountRequest,
  ): Promise<api.v1.FindAccountResponse> {
    const response = this.account.find(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindAccountResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  findByIdentifier(
    request: api.v1.FindAccountByIdentifierRequest,
  ): Promise<api.v1.FindAccountByIdentifierResponse> {
    const response = this.account.findByIdentifier(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.FindAccountByIdentifierResponse.fromBinary(
        rsp.result.value,
      );
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  update(
    request: api.v1.UpdateAccountRequest,
  ): Promise<api.v1.UpdateAccountResponse> {
    const response = this.account.update(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.UpdateAccountResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  updateEncryption(
    request: api.v1.UpdateEncryptionRequest,
  ): Promise<api.v1.UpdateEncryptionResponse> {
    const response = this.account.updateEncryption(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.UpdateEncryptionResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  exportSecretKey(
    request: api.v1.ExportSecretKeyRequest,
  ): Promise<api.v1.ExportSecretKeyResponse> {
    const response = this.account.exportSecretKey(
      Buffer.from(request.toBinary()),
    );
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === "data") {
      const data = api.v1.ExportSecretKeyResponse.fromBinary(rsp.result.value);
      return Promise.resolve(data);
    } else {
      throw buildErrorResponse(rsp);
    }
  }
}
