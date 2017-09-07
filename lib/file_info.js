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
