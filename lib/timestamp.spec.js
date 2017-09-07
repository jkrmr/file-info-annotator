import { describe, it } from 'mocha'
import { expect } from 'chai'

import timestamp from './timestamp'

describe('#timestamp', () => {
  it('returns an appropriately formatted timestamp string in UTC', () => {
    let est = new Date('Dec 31 2014 20:30:40 GMT-0500 (EST)')
    expect(timestamp(est)).to.eq('2015-01-01_01-40')

    let utc = new Date('Nov 12 2000 12:04:55 GMT-0000 (UTC)')
    expect(timestamp(utc)).to.eq('2000-11-12_12-55')
  })
})
