import { describe, it } from 'mocha'
import { expect } from 'chai'

import Results from './results'

describe('Results', () => {
  describe('#addSuccess', () => {
    it('pushes onto a success stack', () => {
      let results = new Results()

      results.addSuccess('file-one')
      results.addSuccess('file-two')

      expect(results.successes).to.eql(['file-one', 'file-two'])
    })
  })

  describe('#addFailure', () => {
    it('pushes onto a failure stack', () => {
      let results = new Results()

      results.addFailure('file-one')
      results.addFailure('file-two')

      expect(results.failures).to.eql(['file-one', 'file-two'])
    })
  })
})
