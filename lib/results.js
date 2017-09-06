class Results {
  constructor() {
    this.filesRenamed = []
    this.filesFailed = []
  }

  success(filename) {
    this.filesRenamed.push(filename)
  }

  failure(filename) {
    this.filesFailed.push(filename)
  }
}

export default Results
