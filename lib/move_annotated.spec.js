import mockfs from 'mock-fs'
import sinon from 'sinon'
import { describe, it, before, after } from 'mocha'
import chai, { expect } from 'chai'

import MoveAnnotated from './move_annotated'

before(() => {
  mockfs({
    'files/original': {
      'file.txt': 'some text',
      'file.json': '{"text": "some text"}'
    },
    'files/moved': {
      'edited.txt': '',
      'edited.json': ''
    }
  })
})

after(mockfs.restore)

describe('MoveAnnotated', () => {
  describe('.fileWithInfo', () => {
    it('returns txt file handler if given txt extension', () => {
      let spy = sinon.spy(MoveAnnotated, 'txt')

      MoveAnnotated.fileWithInfo({
        extension: 'txt',
        filepath: 'files/original/file.txt',
        newFilepath: 'files/moved/edited.txt',
        fileInfo: {}
      })

      expect(MoveAnnotated.txt.calledOnce).to.eq(true)
    })

    it('returns json file handler if given json extension', () => {
      let spy = sinon.spy(MoveAnnotated, 'json')

      MoveAnnotated.fileWithInfo({
        extension: 'json',
        filepath: 'files/original/file.json',
        newFilepath: 'files/moved/edited.json',
        fileInfo: {}
      })

      expect(MoveAnnotated.json.calledOnce).to.eq(true)
    })

    it('raises if given an unrecognized type', () => {
      let invalidType = () => {
        MoveAnnotated.fileWithInfo({ extension: 'pdf' })
      }

      expect(invalidType).to.throw(/unrecognized filetype/)
    })
  })
})
