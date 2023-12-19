import { api } from "@mystikonetwork/protos";
import mystiko from "../../src";
import {
  createWallet,
  initMystiko,
  WalletPassword,
  WalletMnemonicPhrase,
} from "../common/base";

beforeAll(async () => {
  await initMystiko();
  await createWallet();
});

test("check current", async () => {
  const response = await mystiko.wallet?.checkCurrent();
  if (!response?.wallet) {
    throw new Error("wallet are undefined");
  }
  expect(response.wallet.accountNonce).toBe(0);
});

test("check password", async () => {
  const request = new api.v1.CheckPasswordRequest({
    password: WalletPassword,
  });
  const response = await mystiko.wallet?.checkPassword(request);
  if (!response?.wallet) {
    throw new Error("wallet are undefined");
  }
  expect(response.wallet.accountNonce).toBe(0);
});

test("export mnemonic phrase", async () => {
  const request = new api.v1.ExportMnemonicPhraseRequest({
    password: WalletPassword,
  });
  const response = await mystiko.wallet?.exportMnemonicPhrase(request);
  if (!response?.mnemonicPhrase) {
    throw new Error("wallet are undefined");
  }
  expect(response.mnemonicPhrase).toBe(WalletMnemonicPhrase);
});

test("update password", async () => {
  const newPassword = "new&456Abc";
  const request = new api.v1.UpdatePasswordRequest({
    oldPassword: WalletPassword,
    newPassword: newPassword,
  });
  const response = await mystiko.wallet?.updatePassword(request);
  if (!response?.wallet) {
    throw new Error("wallet are undefined");
  }
  expect(response.wallet.accountNonce).toBe(0);

  const request2 = new api.v1.CheckPasswordRequest({
    password: newPassword,
  });
  const response2 = await mystiko.wallet?.checkPassword(request2);
  if (!response2?.wallet) {
    throw new Error("wallet are undefined");
  }
  expect(response2.wallet.accountNonce).toBe(0);

  const request3 = new api.v1.UpdatePasswordRequest({
    oldPassword: newPassword,
    newPassword: WalletPassword,
  });
  const response3 = await mystiko.wallet?.updatePassword(request3);
  if (!response3?.wallet) {
    throw new Error("wallet are undefined");
  }
  expect(response3.wallet.accountNonce).toBe(0);
});
