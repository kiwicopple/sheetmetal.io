// Common

export const baseUrl = req => {
  let { host } = req.headers
  let protocol = req.secure ? 'https:' : 'http:'
  return `${protocol}//${host}`
}

export const copyInputValue = (inputRef, onSuccess, onError) => {
  try {
    inputRef.focus()
    inputRef.select()
    var successful = document.execCommand('copy')
    if (successful) return onSuccess()
    else return onError()
  } catch (err) {
    console.log('err', err)
    let emitOnError = onError || (() => {})
    return emitOnError()
  }
}