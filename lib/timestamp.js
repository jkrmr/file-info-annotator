const timestamp = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hour = date.getHours()
  const sec = date.getSeconds()
  return `${year}-${month}-${day}_${hour}-${sec}`
}

export default timestamp
