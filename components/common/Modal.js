import React from 'react'
import ReactDOM from 'react-dom'

const constructModal = props => {
  let {
    onCancel,
    message,
    submessage,
    secondaryButtonClass,
    secondaryButtonText,
    onSecondaryClick,
    primaryButtonClass,
    primaryButtonText,
    onPrimaryClick,
    icon,
    title,
    textInput,
    onTextInputChanged,
  } = props
  let emitOnCancel = onCancel || (() => {})
  let emitOnSecondaryClick = onSecondaryClick || (() => {})
  let emitOnPrimaryClick = onPrimaryClick || (() => {})
  let emitOnTextInputChanged = onTextInputChanged || (() => {})

  return (
    <div className="custom-modal" id="Modal">
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head has-text-centered">
            <p className="modal-card-title">{title || ''}</p>
            <button className="delete" onClick={() => emitOnCancel()} />
          </header>
          <section className="modal-card-body has-text-centered">
            <p className="animated headShake is-size-5 has-text-weight-semibold">{message}</p>
            <p className="">{submessage}</p>
            {textInput != null && (
              <div className="field">
                <p className="control is-expanded has-icons-left">
                  <input
                    className="input"
                    value={textInput}
                    onChange={e => {
                      emitOnTextInputChanged(e.target.value)
                    }}
                    placeholder="Create a description to identify where you are using this key"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-align-left" />
                  </span>
                </p>
              </div>
            )}
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button
                className={`button is-outlined ${secondaryButtonClass || ''}`}
                onClick={() => emitOnSecondaryClick()}
              >
                {secondaryButtonText}
              </button>
              <button
                className={`button ${primaryButtonClass || ''}`}
                onClick={() => emitOnPrimaryClick()}
              >
                <span>{primaryButtonText}</span>
                <span className="icon">
                  <i className={`fas fa-fw ${icon}`} />
                </span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

function Modal(props) {
  if (typeof window !== 'undefined') {
    let modal = constructModal(props)
    return ReactDOM.createPortal(modal, document.querySelector('#modal'))
  } else return []
}

export default Modal
