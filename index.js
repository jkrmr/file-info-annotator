import fs from 'fs-extra'

import FileInfo from './lib/file_info'
import MoveAnnotated from './lib/move_annotated'
import Results from './lib/results'
import completionMessage from './lib/completion_message'
import timestamp from './lib/timestamp'

const ORIGINAL_PATH = './files/original'
const NEW_PATH = './files/moved'
const results = new Results()

fs.readdir(ORIGINAL_PATH)
  .then(files => {
    return files.map(originalName => {
      const fileInfo = new FileInfo({
        filepath: ORIGINAL_PATH,
        filename: originalName,
        targetDir: NEW_PATH,
        timestamp: timestamp()
      })

      return MoveAnnotated.fileWithInfo(fileInfo)
        .then(renamedFile => results.success(renamedFile))
        .catch(failedFile => results.failure(failedFile))
    })
  })
  .then(renameOps => Promise.all(renameOps))
  .then(() => console.log(completionMessage(results)))
  .catch(error => console.log(error))