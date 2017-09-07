import fs from 'fs-extra'

class MoveAnnotated {
  // Invoke the correct handler based on the given file extension.
  //
  // Parameter:
  //   - fileInfo: Object - File info, including `extension`, which is expected
  //               to be either 'json' or 'txt'
  //
  // Returns: A Promise
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

  // Move the source file's json data, annotated, to the target directory.
  // Asynchronous.
  //
  // Named Parameters:
  //   - filepath: String - the full path to the source file
  //   - newFilepath: String - the full path to the target file
  //   - fileInfo: Object - data with which to annotate the target file
  //
  // Returns: A Promise
  static json ({ filepath, newFilepath, fileInfo }) {
    return fs.readJson(filepath)
      .then(json => {
        json['file_info'] = fileInfo
        return fs.writeJson(newFilepath, json)
      })
  }

  // Move the source file's text data, annotated, to the target directory.
  // Asynchronous.
  //
  // Named Parameters:
  //   - filepath: String - the full path to the source file
  //   - newFilepath: String - the full path to the target file
  //   - fileInfo: Object - data with which to annotate the target file
  //
  // Returns: A Promise
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
