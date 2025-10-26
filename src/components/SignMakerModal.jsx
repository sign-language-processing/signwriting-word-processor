import { useEffect, useRef, useMemo } from 'react'
import './SignMakerModal.css'

function SignMakerModal({ isOpen, onClose, onSignUpdate, initialSign }) {
  const iframeRef = useRef(null)
  const domain = 'sutton-signwriting.github.io'

  // Build URL with SWU parameter if editing existing sign
  const frameUrl = useMemo(() => {
    if (initialSign) {
      return `https://${domain}/signmaker/index.html#?swu=${encodeURIComponent(initialSign)}`
    }
    return `https://${domain}/signmaker/index.html`
  }, [initialSign])

  useEffect(() => {
    if (!isOpen) return

    const handleMessage = (event) => {
      // Accept messages from SignMaker
      if (!event.origin.includes('sutton-signwriting')) return

      // SignMaker sends save message with swu data
      if (event.data.signmaker === 'save' && event.data.swu) {
        onSignUpdate(event.data.swu)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [isOpen, onSignUpdate])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialSign ? 'Edit Sign' : 'Create New Sign'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <iframe
            ref={iframeRef}
            src={frameUrl}
            className="signmaker-iframe"
            title="SignMaker"
          />
        </div>
      </div>
    </div>
  )
}

export default SignMakerModal
