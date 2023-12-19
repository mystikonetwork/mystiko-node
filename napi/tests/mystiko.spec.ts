import test from "ava";
import { Mystiko } from "../index";
import { InitMystiko } from "./base";

test("test mystiko", (t) => {
  InitMystiko();
  const init = Mystiko.isInitialized();
  t.is(init, true);
  Mystiko.destroy();
  const init2 = Mystiko.isInitialized();
  t.is(init2, false);
  t.pass();
});
