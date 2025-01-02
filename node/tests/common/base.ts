import { common, core, relayer } from '@mystikonetwork/protos';
import mystiko from '../../src';

export const FULL_CONFIG_FILE = 'tests/files/full.json';
export const RELAYER_CONFIG_FILE = 'tests/files/relayer.json';
export const WalletPassword = 'test123&456Abc';
export const WalletMnemonicPhrase =
  'valley canyon digital way seat payment tape legend bid scrap recall inherit glory often spike speak denial purpose metal tree cheap wonder minute waste';

export function initMystiko() {
  const options = new core.v1.MystikoOptions({
    configOptions: new common.v1.ConfigOptions({
      filePath: FULL_CONFIG_FILE,
    }),
    relayerClientOptions: new relayer.v1.RelayerClientOptions({
      relayerConfigFilePath: RELAYER_CONFIG_FILE,
    }),
  });
  mystiko.initialize(options);
}

export function destroyMystiko() {
  mystiko.destroy();
}

export function createWallet(): core.document.v1.Wallet | undefined {
  const options = new core.handler.v1.CreateWalletOptions({
    password: WalletPassword,
    mnemonic: {
      mnemonicPhrase: WalletMnemonicPhrase,
      mnemonicType: core.v1.MnemonicType.RUST,
    },
  });
  return mystiko.wallet?.create(options);
}

export function createAccount(): core.document.v1.Account | undefined {
  const options = new core.handler.v1.CreateAccountOptions({
    walletPassword: WalletPassword,
    name: 'test_account',
  });
  return mystiko.account?.create(options);
}
