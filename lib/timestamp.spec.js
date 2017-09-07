import { describe, it, after } from 'mocha'
import { expect } from 'chai'
import { useFakeTimers } from 'sinon'

import timestamp from './timestamp'

let clock
after(() => clock.restore())

describe('#timestamp', () => {
  it('returns an appropriately formatted timestamp string', () => {
    let time = new Date('Thu Jan 01 2015 13:30:40 GMT-0500 (EST)')
    clock = useFakeTimers(time.valueOf())

    let timestampString = timestamp()

    expect(timestampString).to.eq('2015-1-1_13-40')
  })
})
