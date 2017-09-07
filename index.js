import fs from 'fs-extra'
import parseArgs from 'minimist'

import FileInfo from './lib/file_info'
import MoveAnnotated from './lib/move_annotated'
import Results from './lib/results'
import completionMessage from './lib/completion_message'
import timestamp from './lib/timestamp'

// Parse command-line arguments
const { source, target, s, t } = parseArgs(process.argv.slice(2))
const ORIGINAL_PATH = source || s || './files/original'
const NEW_PATH = target || t || './files/moved'

const VALID_FILE_EXTENSIONS = /\.txt$|\.json$/
const results = new Results()

// Process a single file:
// Parse file info and save, annotated, to target directory
const processFile = (filename) => {
  const fileInfo = new FileInfo({
    sourceDir: ORIGINAL_PATH,
    filename: filename,
    targetDir: NEW_PATH,
    timestamp: timestamp()
  })

  return MoveAnnotated.fileWithInfo(fileInfo)
    .then(() => results.addSuccess(filename))
    .catch(error => {
      console.log(error.message)
      results.addFailure(filename)
    })
}

// read contents of source directory, process valid files,
// handle errors and generate completion message
fs.readdir(ORIGINAL_PATH)
  .then(files => files
    .filter(name => VALID_FILE_EXTENSIONS.test(name))
    .map(originalName => processFile(originalName)))
  .then(renameOps => Promise.all(renameOps))
  .then(() => console.log(completionMessage(results)))
  .catch(error => {
    console.log(error)
    console.log('renamed 0 files: source directory not found')
  })
