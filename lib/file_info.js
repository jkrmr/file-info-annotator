class FileInfo {
  constructor({ filepath, filename, targetDir, timestamp }) {
    // original file info
    const [basename, extension] = filename.split('.')
    this.basename = basename
    this.extension = extension
    this.filepath = filepath
    this.filename = filename
    this.fullPath = `${filepath}/${filename}`

    // target file info
    this.newFilepath = targetDir
    this.newFilename =
      `${basename}_EDITED_${timestamp}.${extension}`
    this.newFullpath = `${targetDir}/${this.newFilename}`

    // file info to annotate with
    this.infoObject = {
      originalPath: this.filepath,
      originalName: this.filename,
      newPath: this.newFilepath,
      newName: this.newFilename
    }
  }
}

export default FileInfo
