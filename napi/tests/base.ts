import { core, common, api, relayer } from '@mystikonetwork/protos';
import test from 'ava';
import { Account, Mystiko, Wallet } from '../index';

const { MystikoOptions } = core.v1;
const { ConfigOptions } = common.v1;
const { RelayerClientOptions } = relayer.v1;
const { CreateWalletRequest, CreateAccountRequest } = api.handler.v1;
const { CreateWalletOptions, CreateAccountOptions } = core.handler.v1;

const FULL_CONFIG_FILE = 'tests/files/full.json';
const RELAYER_CONFIG_FILE = 'tests/files/relayer.json';

export const WalletPassword = '123&456Abc';
export const WalletMnemonicPhrase =
  'valley canyon digital way seat payment tape legend bid scrap recall inherit glory often spike speak denial purpose metal tree cheap wonder minute waste';

export function InitMystiko() {
  const request = new MystikoOptions({
    configOptions: new ConfigOptions({
      filePath: FULL_CONFIG_FILE,
    }),
    relayerClientOptions: new RelayerClientOptions({
      relayerConfigFilePath: RELAYER_CONFIG_FILE,
    }),
  });
  const bytes = request.toBinary();
  const mystiko = new Mystiko();
  mystiko.initialize(bytes);
}

export function createWallet(): Buffer {
  const request = new CreateWalletRequest({
    options: new CreateWalletOptions({
      password: WalletPassword,
      mnemonicPhrase: WalletMnemonicPhrase,
    }),
  });
  const wallet = new Wallet();
  return wallet.create(request.toBinary());
}

export function createAccount(): Buffer {
  const request = new CreateAccountRequest({
    options: new CreateAccountOptions({
      walletPassword: WalletPassword,
      name: 'test_account',
    }),
  });
  const account = new Account();
  return account.create(request.toBinary());
}

test('test ', (t) => {
  t.pass();
});
