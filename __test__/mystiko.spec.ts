import test from 'ava'

import { Mystiko } from '../index'

import { InitMystiko } from './base'

test('test initialize', (t) => {
  InitMystiko()
  const init = Mystiko.isInitialized()
  t.is(init, true)
  t.pass()
})
