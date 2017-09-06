import pluralize from 'pluralize'

const errorListing = (filesFailed) => {
  if (filesFailed.length === 0) { return '' }
  return `(${filesFailed.join(', ')})`
}

const completionMessage = (results) => {
  const renamed = results.filesRenamed
  const failed = results.filesFailed

  return `\
renamed ${renamed.length} ${pluralize('file', renamed.length)}, \
with ${failed.length} ${pluralize('error', failed.length)} \
${errorListing(failed)}`
}

export default completionMessage
