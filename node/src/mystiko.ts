import { Mystiko } from "@mystikonetwork/napi";
import { core, api } from "@mystikonetwork/protos";
import { buildErrorResponse } from "./common";
import { MystikoConfig } from "./config";
import { MystikoAccount, MystikoWallet } from "./handler";

export class MystikoNode {
  config?: MystikoConfig;
  wallet?: MystikoWallet;
  account?: MystikoAccount;

  initialize(options: core.v1.MystikoOptions): Promise<void> {
    const mystiko = new Mystiko();
    const response = mystiko.initialize(Buffer.from(options.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success) {
      this.init();
      return Promise.resolve();
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  isInitialized(): Promise<boolean> {
    return Promise.resolve(Mystiko.isInitialized());
  }

  destroy(): Promise<void> {
    Mystiko.destroy();
    return Promise.resolve();
  }

  private init() {
    this.config = new MystikoConfig();
    this.wallet = new MystikoWallet();
    this.account = new MystikoAccount();
  }
}

const mystiko = new MystikoNode();
export default mystiko;
