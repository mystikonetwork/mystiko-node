import { Spend } from '@mystikonetwork/napi';
import { api, core, service, storage } from '@mystikonetwork/protos';
import { buildEmptyDataResponse, buildErrorResponse, ConvertToQueryFilter } from '../common';

export class MystikoNodeSpend {
  private readonly spend: Spend;

  constructor() {
    this.spend = new Spend();
  }

  public quote(options: core.handler.v1.QuoteSpendOptions): core.handler.v1.SpendQuote {
    const request = new api.handler.v1.SpendQuoteRequest({
      options,
    });
    const response = this.spend.quote(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.SpendQuoteResponse.fromBinary(rsp.result.value);
      if (data.quote) {
        return data.quote;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public summary(options: core.handler.v1.CreateSpendOptions): core.handler.v1.SpendSummary {
    const request = new api.handler.v1.SpendSummaryRequest({
      options,
    });
    const response = this.spend.summary(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.SpendSummaryResponse.fromBinary(rsp.result.value);
      if (data.summary) {
        return data.summary;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public create(options: core.handler.v1.CreateSpendOptions): core.document.v1.Spend {
    const request = new api.handler.v1.CreateSpendRequest({
      options,
    });
    const response = this.spend.create(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CreateSpendResponse.fromBinary(rsp.result.value);
      if (data.spend) {
        return data.spend;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public send(options: core.handler.v1.SendSpendOptions): core.document.v1.Spend {
    const request = new api.handler.v1.SendSpendRequest({
      options,
    });
    const response = this.spend.send(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.SendSpendResponse.fromBinary(rsp.result.value);
      if (data.spend) {
        return data.spend;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public sendWithGrpc(
    sendOptions: core.handler.v1.SendSpendOptions,
    clientOptions: service.v1.ClientOptions,
  ): core.document.v1.Spend {
    const request = new api.handler.v1.SendSpendWithGrpcRequest({
      sendOptions,
      clientOptions,
    });
    const response = this.spend.sendWithGrpc(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.SendSpendResponse.fromBinary(rsp.result.value);
      if (data.spend) {
        return data.spend;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public find(
    filter?: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ): core.document.v1.Spend[] {
    if (filter) {
      return this.findByFilter(filter);
    } else {
      return this.findAll();
    }
  }

  public findOne(
    filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ): core.document.v1.Spend {
    const queryFilter = ConvertToQueryFilter(filter);
    const request = new api.handler.v1.FindSpendRequest({
      filter: queryFilter,
    });
    const response = this.spend.findOne(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindOneSpendResponse.fromBinary(rsp.result.value);
      if (data.spend) {
        return data.spend;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public findById(id: string): core.document.v1.Spend {
    const request = new api.handler.v1.FindSpendByIdRequest({
      id,
    });
    const response = this.spend.findById(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindOneSpendResponse.fromBinary(rsp.result.value);
      if (data.spend) {
        return data.spend;
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

  public update(spend: core.document.v1.Spend): core.document.v1.Spend {
    const request = new api.handler.v1.UpdateSpendRequest({
      spend,
    });
    const response = this.spend.update(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.UpdateSpendResponse.fromBinary(rsp.result.value);
      if (data.spend) {
        return data.spend;
      } else {
        throw buildEmptyDataResponse();
      }
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public updateBatch(spends: core.document.v1.Spend[]): core.document.v1.Spend[] {
    const request = new api.handler.v1.UpdateSpendBatchRequest({
      spends,
    });
    const response = this.spend.updateBatch(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.UpdateSpendBatchResponse.fromBinary(rsp.result.value);
      return data.spends;
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

  public delete(spend: core.document.v1.Spend) {
    const request = new api.handler.v1.DeleteSpendRequest({
      spend,
    });
    const response = this.spend.delete(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }

  public deleteBatch(spends: core.document.v1.Spend[]) {
    const request = new api.handler.v1.DeleteSpendBatchRequest({
      spends,
    });
    const response = this.spend.deleteBatch(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }

  public deleteByFilter(filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter) {
    const queryFilter = ConvertToQueryFilter(filter);
    const request = new api.handler.v1.DeleteSpendByFilterRequest({
      filter: queryFilter,
    });
    const response = this.spend.deleteByFilter(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }

  public deleteAll() {
    const response = this.spend.deleteAll();
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }

  private findByFilter(
    filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ): core.document.v1.Spend[] {
    const queryFilter = ConvertToQueryFilter(filter);
    const request = new api.handler.v1.FindSpendRequest({
      filter: queryFilter,
    });
    const response = this.spend.find(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindSpendsResponse.fromBinary(rsp.result.value);
      return data.spends;
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  private findAll(): core.document.v1.Spend[] {
    const response = this.spend.findAll();
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.FindSpendsResponse.fromBinary(rsp.result.value);
      return data.spends;
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  private countByFilter(
    filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
  ): bigint {
    const queryFilter = ConvertToQueryFilter(filter);
    const request = new api.handler.v1.CountSpendsRequest({
      filter: queryFilter,
    });
    const response = this.spend.count(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CountSpendsResponse.fromBinary(rsp.result.value);
      return data.count;
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  private countAll(): bigint {
    const response = this.spend.countAll();
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success && rsp.result.case === 'data') {
      const data = api.handler.v1.CountSpendsResponse.fromBinary(rsp.result.value);
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
    const request = new api.handler.v1.UpdateSpendByFilterRequest({
      columnValues,
      filter: queryFilter,
    });
    const response = this.spend.updateByFilter(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }

  private updateAll(columnValues: api.handler.v1.ColumnValuePair[]) {
    const request = new api.handler.v1.UpdateAllSpendRequest({
      columnValues,
    });
    const response = this.spend.updateAll(Buffer.from(request.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (!rsp.code?.success) {
      throw buildErrorResponse(rsp);
    }
  }
}
