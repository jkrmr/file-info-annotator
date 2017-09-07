import fs from 'fs-extra'
import mockfs from 'mock-fs'
import { spy } from 'sinon'
import { describe, it, before, after } from 'mocha'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import MoveAnnotated from './move_annotated'

chai.use(chaiAsPromised)

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
    it('invokes txt file handler if given txt extension', () => {
      spy(MoveAnnotated, 'txt')

      MoveAnnotated.fileWithInfo({
        extension: 'txt',
        filepath: 'files/original/file.txt',
        newFilepath: 'files/moved/edited.txt',
        fileInfo: {}
      })

      expect(MoveAnnotated.txt.calledOnce).to.eq(true)
    })

    it('invokes json file handler if given json extension', () => {
      spy(MoveAnnotated, 'json')

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

  describe('.txt', () => {
    it('writes text from source file, annotated, to target file', () => {
      let fileInfo = { originalName: 'file.txt' }
      let sourceDir = 'files/original'
      let filename = 'file.txt'
      let filepath = `${sourceDir}/${filename}`

      let targetDir = 'files/moved'
      let newFilename = 'edited.txt'
      let newFilepath = `${targetDir}/${newFilename}`

      let expectedText =
        'some text\n\nFile Info:\noriginalName: file.txt'

      MoveAnnotated.txt({ filepath, newFilepath, fileInfo })
        .then(() => {
          expect(fs.readFile(newFilepath, 'utf-8'))
            .to
            .eventually
            .equal(expectedText)
        })
    })
  })

  describe('.json', () => {
    it('writes json from source file, annotated, to target file', () => {
      let fileInfo = { originalName: 'file.json' }
      let sourceDir = 'files/original'
      let filename = 'file.json'
      let filepath = `${sourceDir}/${filename}`

      let targetDir = 'files/moved'
      let newFilename = 'edited.json'
      let newFilepath = `${targetDir}/${newFilename}`

      let expectedJson = {
        'text': 'some text',
        'file_info': {
          originalName: 'file.json'
        }
      }

      MoveAnnotated.json({ filepath, newFilepath, fileInfo })
        .then(() => {
          expect(fs.readJson(newFilepath))
            .to
            .eventually
            .eql(expectedJson)
        })
    })
  })
})
