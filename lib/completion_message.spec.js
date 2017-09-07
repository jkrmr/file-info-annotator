import { describe, it } from 'mocha'
import { expect } from 'chai'

import completionMessage from './completion_message'

describe('completionMessage', () => {
  it('given no errors, pluralizes correctly', () => {
    let results = { filesRenamed: [1, 2], filesFailed: [] }
    let message = completionMessage(results)
    expect(message).to.match(/with 0 errors/)
  })

  it('given one error, pluralizes correctly', () => {
    let results = { filesRenamed: [1, 2], filesFailed: [1] }
    let message = completionMessage(results)
    expect(message).to.match(/with 1 error \(1\)/)
  })

  it('given multiple errors, pluralizes correctly', () => {
    let results = { filesRenamed: [1, 2], filesFailed: [1, 2, 3] }
    let message = completionMessage(results)
    expect(message).to.match(/with 3 errors \(1, 2, 3\)/)
  })

  it('given no successes, pluralizes correctly', () => {
    let results = { filesRenamed: [], filesFailed: [1, 2, 3] }
    let message = completionMessage(results)
    expect(message).to.match(/renamed 0 files/)
  })

  it('given one success, pluralizes correctly', () => {
    let results = { filesRenamed: [1], filesFailed: [1, 2, 3] }
    let message = completionMessage(results)
    expect(message).to.match(/renamed 1 file/)
  })

  it('given multiple successes, pluralizes correctly', () => {
    let results = { filesRenamed: [1, 2, 3], filesFailed: [1, 2, 3] }
    let message = completionMessage(results)
    expect(message).to.match(/renamed 3 files/)
  })
})
