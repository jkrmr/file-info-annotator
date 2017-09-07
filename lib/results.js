// Maintain a pair of lists for keeping track of success and failure cases.
class Results {
  constructor () {
    this.successes = []
    this.failures = []
  }

  addSuccess (filename) {
    this.successes.push(filename)
  }

  addFailure (filename) {
    this.failures.push(filename)
  }
}

export default Results
