import { api, common, core, relayer } from "@mystikonetwork/protos";
import mystiko from "../../src";

export const FULL_CONFIG_FILE = "tests/files/full.json";
export const RELAYER_CONFIG_FILE = "tests/files/relayer.json";
export const WalletPassword = "test123&456Abc";
export const WalletMnemonicPhrase =
  "valley canyon digital way seat payment tape legend bid scrap recall inherit glory often spike speak denial purpose metal tree cheap wonder minute waste";

export async function initMystiko() {
  const options = new core.v1.MystikoOptions({
    configOptions: new common.v1.ConfigOptions({
      filePath: FULL_CONFIG_FILE,
    }),
    relayerClientOptions: new relayer.v1.RelayerClientOptions({
      relayerConfigFilePath: RELAYER_CONFIG_FILE,
    }),
  });
  await mystiko.initialize(options);
}

export async function destroyMystiko() {
  await mystiko.destroy();
}

export async function createWallet(): Promise<
  api.v1.CreateWalletResponse | undefined
> {
  const request = new api.v1.CreateWalletRequest({
    options: new core.handler.v1.CreateWalletOptions({
      password: WalletPassword,
      mnemonicPhrase: WalletMnemonicPhrase,
    }),
  });
  return mystiko.wallet?.create(request);
}

export async function createAccount(): Promise<
  api.v1.CreateAccountResponse | undefined
> {
  const request = new api.v1.CreateAccountRequest({
    options: new core.handler.v1.CreateAccountOptions({
      walletPassword: WalletPassword,
      name: "test_account",
    }),
  });
  return mystiko.account?.create(request);
}
