// Common

export const baseUrl = () => {
  return process.env.BASE_URL
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