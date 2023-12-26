import { Deposit } from '@mystikonetwork/napi';
import { api, core, service, storage } from '@mystikonetwork/protos';
import { buildEmptyDataResponse, buildErrorResponse, ConvertToQueryFilter } from '../common';

export class MystikoNodeDeposit {
  private readonly deposit: Deposit;

  constructor() {
    this.deposit = new Deposit();
  }

  public quote(options: core.handler.v1.QuoteDepositOptions): core.handler.v1.DepositQuote {
    const request = new api.handler.v1.QuoteRequest({
      options,
    });
    const response = this.deposit.quote(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.QuoteResponse.fromBinary(rsp.result.value);
      if (data.quote) {
        return data.quote;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public summary(options: core.handler.v1.CreateDepositOptions): core.handler.v1.DepositSummary {
    const request = new api.handler.v1.SummaryRequest({
      options,
    });
    const response = this.deposit.summary(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.SummaryResponse.fromBinary(rsp.result.value);
      if (data.summary) {
        return data.summary;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public create(options: core.handler.v1.CreateDepositOptions): core.document.v1.Deposit {
    const request = new api.handler.v1.CreateDepositRequest({
      options,
    });
    const response = this.deposit.create(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CreateDepositResponse.fromBinary(rsp.result.value);
      if (data.deposit) {
        return data.deposit;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public send(options: core.handler.v1.SendDepositOptions): core.document.v1.Deposit {
    const request = new api.handler.v1.SendRequest({
      options,
    });
    const response = this.deposit.send(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.SendResponse.fromBinary(rsp.result.value);
      if (data.deposit) {
        return data.deposit;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public sendWithGrpc(
    sendOptions: core.handler.v1.SendDepositOptions,
    clientOptions: service.v1.ClientOptions,
  ): core.document.v1.Deposit {
    const request = new api.handler.v1.SendWithGrpcRequest({
      sendOptions,
      clientOptions,
    });
    const response = this.deposit.sendWithGrpc(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.SendResponse.fromBinary(rsp.result.value);
      if (data.deposit) {
        return data.deposit;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public find(
    filter?: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ): core.document.v1.Deposit[] {
    if (filter) {
      return this.findByFilter(filter);
    } else {
      return this.findAll();
    }
  }

  public findOne(
    filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ): core.document.v1.Deposit {
    const queryFilter = ConvertToQueryFilter(filter);
    const request = new api.handler.v1.FindDepositRequest({
      filter: queryFilter,
    });
    const response = this.deposit.findOne(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindOneDepositResponse.fromBinary(rsp.result.value);
      if (data.deposit) {
        return data.deposit;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findById(id: string): core.document.v1.Deposit {
    const request = new api.handler.v1.FindDepositByIdRequest({
      id,
    });
    const response = this.deposit.findById(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindOneDepositResponse.fromBinary(rsp.result.value);
      if (data.deposit) {
        return data.deposit;
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

  public update(deposit: core.document.v1.Deposit): core.document.v1.Deposit {
    const request = new api.handler.v1.UpdateDepositRequest({
      deposit,
    });
    const response = this.deposit.update(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.UpdateDepositResponse.fromBinary(rsp.result.value);
      if (data.deposit) {
        return data.deposit;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public updateBatch(deposits: core.document.v1.Deposit[]): core.document.v1.Deposit[] {
    const request = new api.handler.v1.UpdateDepositBatchRequest({
      deposits,
    });
    const response = this.deposit.updateBatch(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.UpdateDepositBatchResponse.fromBinary(rsp.result.value);
      return data.deposits;
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public updateByValues(
    columnValues: api.handler.v1.ColumnValuePair[],
    filter?: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ) {
    if (filter) {
      return this.updateByFilter(columnValues, filter);
    } else {
      return this.updateAll(columnValues);
    }
  }

  public delete(deposit: core.document.v1.Deposit) {
    const request = new api.handler.v1.DeleteDepositRequest({
      deposit,
    });
    const response = this.deposit.delete(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }

  public deleteBatch(deposits: core.document.v1.Deposit[]) {
    const request = new api.handler.v1.DeleteDepositBatchRequest({
      deposits,
    });
    const response = this.deposit.deleteBatch(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }

  public deleteByFilter(filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter) {
    const queryFilter = ConvertToQueryFilter(filter);
    const request = new api.handler.v1.DeleteDepositByFilterRequest({
      filter: queryFilter,
    });
    const response = this.deposit.deleteByFilter(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }

  public deleteAll() {
    const response = this.deposit.deleteAll();
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }

  private findByFilter(
    filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ): core.document.v1.Deposit[] {
    const queryFilter = ConvertToQueryFilter(filter);
    const request = new api.handler.v1.FindDepositRequest({
      filter: queryFilter,
    });
    const response = this.deposit.find(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindDepositResponse.fromBinary(rsp.result.value);
      return data.deposits;
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  private findAll(): core.document.v1.Deposit[] {
    const response = this.deposit.findAll();
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindDepositResponse.fromBinary(rsp.result.value);
      return data.deposits;
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  private countByFilter(
    filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ): bigint {
    const queryFilter = ConvertToQueryFilter(filter);
    const request = new api.handler.v1.CountDepositRequest({
      filter: queryFilter,
    });
    const response = this.deposit.count(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CountDepositResponse.fromBinary(rsp.result.value);
      return data.count;
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  private countAll(): bigint {
    const response = this.deposit.countAll();
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CountDepositResponse.fromBinary(rsp.result.value);
      return data.count;
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  private updateByFilter(
    columnValues: api.handler.v1.ColumnValuePair[],
    filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ) {
    const queryFilter = ConvertToQueryFilter(filter);
    const request = new api.handler.v1.UpdateDepositByFilterRequest({
      columnValues,
      filter: queryFilter,
    });
    const response = this.deposit.updateByFilter(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }

  private updateAll(columnValues: api.handler.v1.ColumnValuePair[]) {
    const request = new api.handler.v1.UpdateAllDepositRequest({
      columnValues,
    });
    const response = this.deposit.updateAll(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }
}
