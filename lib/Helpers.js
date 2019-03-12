// Common

export const baseUrl = req => {
  let { host } = req.headers
  let protocol = req.secure ? 'https:' : 'http:'
  return `${protocol}//${host}`
}

export const copyInputValue = inputRef => {
  try {
    inputRef.focus()
    inputRef.select()
    var successful = document.execCommand('copy')
    if (successful) return 'SUCCESS'
    else return 'ERROR'
  } catch (err) {
    return 'ERROR'
  }
}
