import { Mystiko } from '@mystikonetwork/napi';
import { core, api } from '@mystikonetwork/protos';
import { buildErrorResponse } from './common';
import { MystikoNodeConfig } from './config';
import { MystikoNodeAccount, MystikoNodeWallet, MystikoNodeDeposit, MystikoNodeSpend } from './handler';
import { MystikoNodeScanner } from './scanner';
import { MystikoNodeSynchronizer } from './synchronizer';

export class MystikoNode {
  config?: MystikoNodeConfig;
  wallet?: MystikoNodeWallet;
  account?: MystikoNodeAccount;
  deposit?: MystikoNodeDeposit;
  spend?: MystikoNodeSpend;
  scanner?: MystikoNodeScanner;
  synchronizer?: MystikoNodeSynchronizer;

  public initialize(options: core.v1.MystikoOptions): void {
    const mystiko = new Mystiko();
    const response = mystiko.initialize(Buffer.from(options.toBinary()));
    const rsp = api.v1.ApiResponse.fromBinary(response);
    if (rsp.code?.success) {
      this.init();
    } else {
      throw buildErrorResponse(rsp);
    }
  }

  public isInitialized(): boolean {
    return Mystiko.isInitialized();
  }

  public destroy(): void {
    Mystiko.destroy();
  }

  private init() {
    this.config = new MystikoNodeConfig();
    this.wallet = new MystikoNodeWallet();
    this.account = new MystikoNodeAccount();
    this.deposit = new MystikoNodeDeposit();
    this.spend = new MystikoNodeSpend();
    this.scanner = new MystikoNodeScanner();
    this.synchronizer = new MystikoNodeSynchronizer();
  }
}

const mystiko = new MystikoNode();
export default mystiko;
