import mystiko from "../src";
import { destroyMystiko, initMystiko } from "./common/base";

test("test initialize", async () => {
  await initMystiko();
  const init = await mystiko.isInitialized();
  expect(init).toBe(true);
  await destroyMystiko();
  const init2 = await mystiko.isInitialized();
  expect(init2).toBe(false);
});
