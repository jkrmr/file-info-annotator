import { describe, it } from 'mocha'
import { expect } from 'chai'

import FileInfo from './file_info'

let fileInfo = new FileInfo({
  filepath: 'path/to/files',
  targetDir: 'path/to/target/directory',
  timestamp: '2015-01-01_15-44',
  filename: 'this_is_a_file.json'
})

describe('FileInfo', () => {
  it('parses original file info', () => {
    expect(fileInfo.basename).to.eq('this_is_a_file')
    expect(fileInfo.extension).to.eq('json')
    expect(fileInfo.filepath).to.eq('path/to/files')
    expect(fileInfo.filename).to.eq('this_is_a_file.json')
    expect(fileInfo.fullPath).to.eq('path/to/files/this_is_a_file.json')
  })

  it('parses target file info', () => {
    let newPath = fileInfo.newFilepath
    let newName = fileInfo.newFilename
    let newFullpath = fileInfo.newFullpath
    let origBasename = fileInfo.basename
    let timestamp = '2015-01-01_15-44'

    expect(newPath).to.eq('path/to/target/directory')
    expect(newName).to.eq(`${origBasename}_EDITED_${timestamp}.json`)
    expect(newFullpath).to.eq(`${newPath}/${newName}`)
  })

  it('has an object prop with data to be appended to source files', () => {
    let info = fileInfo.infoObject
    let timestamp = '2015-01-01_15-44'
    let basename = 'this_is_a_file'

    expect(Object.keys(info))
      .to.eql(['originalPath', 'originalName', 'newPath', 'newName'])
    expect(info.originalPath).to.eq('path/to/files')
    expect(info.originalName).to.eq('this_is_a_file.json')
    expect(info.newPath).to.eq('path/to/target/directory')
    expect(info.newName).to.eq(`${basename}_EDITED_${timestamp}.json`)
  })
})
