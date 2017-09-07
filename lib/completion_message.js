import pluralize from 'pluralize'

const errorListing = (filesFailed) => {
  if (filesFailed.length === 0) { return '' }
  return `(${filesFailed.join(', ')})`
}

// Generate a message summarizing the script's outcomes
//
// Named Parameters:
//   - successes: An Array of success cases (expected: String filenames)
//   - failures: An Array of failure cases (expected: String filenames)
//
// Returns: A String message
const completionMessage = ({ successes, failures }) => {
  return `\
renamed ${successes.length} ${pluralize('file', successes.length)}, \
with ${failures.length} ${pluralize('error', failures.length)} \
${errorListing(failures)}`
}

export default completionMessage
