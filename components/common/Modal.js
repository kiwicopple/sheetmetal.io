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
  } = props
  let emitOnCancel = onCancel || (() => {})
  let emitOnSecondaryClick = onSecondaryClick || (() => {})
  let emitOnPrimaryClick = onPrimaryClick || (() => {})

  console.log('ModalConfirm', primaryButtonText)
  return (
    <div id="ModalConfirm">
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head has-text-centered">
            <p className="modal-card-title" />
            <button className="delete" onClick={() => emitOnCancel()} />
          </header>
          <section className="modal-card-body has-text-centered">
            <p className="animated headShake is-size-5 has-text-weight-semibold">{message}</p>
            <p className="">{submessage}</p>
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button
                className={`button is-rounded is-outlined ${secondaryButtonClass || ''}`}
                onClick={() => emitOnSecondaryClick()}
              >
                {secondaryButtonText}
              </button>
              <button
                className={`super-button button is-medium is-rounded ${primaryButtonClass || ''}`}
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
