import fs from 'fs-extra'

class MoveAnnotated {
  static fileWithInfo (fileInfo) {
    switch (fileInfo.extension) {
      case 'json':
        return MoveAnnotated.json(fileInfo)
      case 'txt':
        return MoveAnnotated.txt(fileInfo)
      default:
        throw new Error('unrecognized filetype')
    }
  }

  static json ({ filepath, newFilepath, fileInfo }) {
    return fs.readJson(filepath)
      .then(json => {
        json['file_info'] = fileInfo
        return fs.writeJson(newFilepath, json)
      })
  }

  static txt ({ filepath, newFilepath, fileInfo }) {
    const info = '\n\nFile Info:\n' +
      Object.keys(fileInfo)
      .map(k => `${k}: ${fileInfo[k]}`)
      .join('\n')

    return fs.readFile(filepath)
      .then(file => fs.writeFile(newFilepath, file + info))
  }
}

export default MoveAnnotated
