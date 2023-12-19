import { api, storage, core } from "@mystikonetwork/protos";
import mystiko from "../../src";
import {
  createAccount,
  createWallet,
  initMystiko,
  WalletPassword,
} from "../common/base";

beforeAll(async () => {
  await initMystiko();
  await createWallet();
  await createAccount();
});

test("test count", async () => {
  const request = new api.v1.CountAccountRequest({
    filter: new storage.v1.QueryFilter({
      conditions: [],
      conditionsOperator: storage.v1.ConditionOperator.OR,
    }),
  });

  const response = await mystiko.account?.count(request);
  if (!response?.count) {
    throw new Error("wallet are undefined");
  }
  expect(response.count).toBe(BigInt(1));
});

test("test count all", async () => {
  const response = await mystiko.account?.countAll();
  if (!response?.count) {
    throw new Error("wallet are undefined");
  }
  expect(response.count).toBe(BigInt(1));
});

test("test find", async () => {
  const request = new api.v1.FindAccountRequest({
    condition: {
      value: true,
      case: "findAll",
    },
  });

  const response = await mystiko.account?.find(request);
  if (!response?.account) {
    throw new Error("wallet are undefined");
  }
  expect(response.account.length).toBe(1);
});

test("test FindAccountByIdentifierRequest", async () => {
  const request = new api.v1.FindAccountRequest({
    condition: {
      value: true,
      case: "findAll",
    },
  });

  const response = await mystiko.account?.find(request);
  if (!response?.account) {
    throw new Error("wallet are undefined");
  }
  expect(response.account.length).toBe(1);

  const request2 = new api.v1.FindAccountByIdentifierRequest({
    identifier: {
      value: response.account[0].id,
      case: "id",
    },
  });
  const response2 = await mystiko.account?.findByIdentifier(request2);
  if (!response2?.account) {
    throw new Error("wallet are undefined");
  }
  expect(response2.account.name).toBe("test_account");
});

test("test update", async () => {
  const request = new api.v1.FindAccountRequest({
    condition: {
      value: true,
      case: "findAll",
    },
  });

  const response = await mystiko.account?.find(request);
  if (!response?.account) {
    throw new Error("wallet are undefined");
  }
  expect(response.account.length).toBe(1);

  const request2 = new api.v1.UpdateAccountRequest({
    identifier: {
      value: response.account[0].id,
      case: "id",
    },
    options: new core.handler.v1.UpdateAccountOptions({
      walletPassword: WalletPassword,
      name: "new account by update",
    }),
  });
  const response2 = await mystiko.account?.update(request2);
  if (!response2?.account) {
    throw new Error("wallet are undefined");
  }
  expect(response2.account.name).toBe("new account by update");
});

test("test export secret key", async () => {
  const request = new api.v1.FindAccountRequest({
    condition: {
      value: true,
      case: "findAll",
    },
  });

  const response = await mystiko.account?.find(request);
  if (!response?.account) {
    throw new Error("wallet are undefined");
  }
  expect(response.account.length).toBe(1);

  const request2 = new api.v1.ExportSecretKeyRequest({
    identifier: {
      value: response.account[0].id,
      case: "id",
    },
    walletPassword: WalletPassword,
  });
  const response2 = await mystiko.account?.exportSecretKey(request2);
  if (!response2?.secretKey) {
    throw new Error("wallet are undefined");
  }
  expect(response2.secretKey.length).toBeGreaterThan(10);
});

test("test update encryption", async () => {
  const newPassword = "new123&456Abc";
  const request = new api.v1.UpdatePasswordRequest({
    oldPassword: WalletPassword,
    newPassword: newPassword,
  });
  const response = await mystiko.wallet?.updatePassword(request);
  if (!response?.wallet) {
    throw new Error("wallet are undefined");
  }
  expect(response.wallet.accountNonce).toBe(1);

  const request2 = new api.v1.UpdateEncryptionRequest({
    oldWalletPassword: WalletPassword,
    newWalletPassword: newPassword,
  });
  const response2 = await mystiko.account?.updateEncryption(request2);
  if (!response2?.account) {
    throw new Error("wallet are undefined");
  }
  expect(response2.account[0].name).toBe("test_account");

  const request3 = new api.v1.UpdatePasswordRequest({
    oldPassword: newPassword,
    newPassword: WalletPassword,
  });
  const response3 = await mystiko.wallet?.updatePassword(request3);
  if (!response3?.wallet) {
    throw new Error("wallet are undefined");
  }
  expect(response3.wallet.accountNonce).toBe(1);

  const request4 = new api.v1.UpdateEncryptionRequest({
    oldWalletPassword: newPassword,
    newWalletPassword: WalletPassword,
  });
  const response4 = await mystiko.account?.updateEncryption(request4);
  if (!response4?.account) {
    throw new Error("wallet are undefined");
  }
  expect(response4.account[0].name).toBe("test_account");
});
