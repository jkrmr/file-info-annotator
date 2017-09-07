import { describe, it } from 'mocha'
import { expect } from 'chai'

import Results from './results'

describe('Results', () => {
  describe('#success', () => {
    it('pushes onto a success stack', () => {
      let results = new Results()

      results.success('file-one')
      results.success('file-two')

      expect(results.filesRenamed).to.eql(['file-one', 'file-two'])
    })
  })

  describe('#failure', () => {
    it('pushes onto a failure stack', () => {
      let results = new Results()

      results.failure('file-one')
      results.failure('file-two')

      expect(results.filesFailed).to.eql(['file-one', 'file-two'])
    })
  })
})
