import fs from 'fs-extra'

class MoveAnnotated {
  static fileWithInfo({ extension, fullPath, newFullpath, infoObject }) {
    switch (extension) {
    case 'txt':
      return MoveAnnotated.txt(fullPath, newFullpath, infoObject)
    case 'json':
      return MoveAnnotated.json(fullPath, newFullpath, infoObject)
    default:
      throw 'unrecognized filetype'
    }
  }

  static json(filepath, newFilepath, fileInfo) {
    return new Promise((resolve, reject) => {
      fs.readJson(filepath)
        .then(json => {
          json.modifications = fileInfo
          fs.writeJson(newFilepath, json)
        })
        .then(() => resolve(fileInfo.originalName))
        .catch(() => reject(fileInfo.originalName))
    })
  }

  static txt(filepath, newFilepath, fileInfo) {
    return new Promise((resolve, reject) => {
      const mods = '\n\nModifications:\n' +
        Object.keys(fileInfo)
        .map(k => `${k}: ${fileInfo[k]}`)
        .join('\n')

      fs.readFile(filepath)
        .then(file => fs.writeFile(newFilepath, file + mods))
        .then(() => resolve(fileInfo.originalName))
        .catch(() => reject(fileInfo.originalName))
    })
  }
}

export default MoveAnnotated
