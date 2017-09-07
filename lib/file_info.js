// Parse source and target file info from parameters
//
// Named Parameters:
//   - sourceDir: String - path to the source directory
//   - filename: String - source filename
//   - targetDir: String - path to the target directory
//   - timestamp: String - time file was processed
//
// Properties:
//   - [parameters are exposed as properties]
//   - basename: the source file's basename
//   - extension: String - the source file's file extension
//   - filepath: String - full path to the source file
//   - newFilename: String - target filename
//   - newFilepath: String - full path to the target file
//   - fileInfo: Object - keys and values to annotate file with
//
class FileInfo {
  constructor ({ sourceDir, filename, targetDir, timestamp }) {
    // original file info
    const [basename, extension] = filename.split('.')
    this.basename = basename
    this.extension = extension
    this.sourceDir = sourceDir
    this.filename = filename
    this.filepath = `${sourceDir}/${filename}`

    // target file info
    this.targetDir = targetDir
    this.newFilename =
      `${basename}_EDITED_${timestamp}.${extension}`
    this.newFilepath = `${targetDir}/${this.newFilename}`

    // file info to annotate with
    this.fileInfo = {
      originalPath: this.sourceDir,
      originalName: this.filename,
      newPath: this.targetDir,
      newName: this.newFilename
    }
  }
}

export default FileInfo
