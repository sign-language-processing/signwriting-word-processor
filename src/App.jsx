import { useState, useEffect, useRef } from 'react'
import './App.css'
import SignMakerModal from './components/SignMakerModal'

const INITIAL_SIGNS = '𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭 𝠀񂇢񂇈񆙡񋎥񋎵𝠃𝤛𝤬񂇈𝤀𝣺񂇢𝤄𝣻񋎥𝤄𝤗񋎵𝤃𝣟񆙡𝣱𝣸 𝠀񅨑񀀙񆉁𝠃𝤙𝤞񀀙𝣷𝤀񅨑𝣼𝤀񆉁𝣳𝣮 񏌁𝣢𝤂 𝠀񀕁𝠃𝤍𝤕񀕁𝣾𝣷 𝠀񂌢񂇷񆙡񈗦𝠃𝤩𝤛񂌢𝣢𝣱񂇷𝣬𝤉񆙡𝤍𝣽񈗦𝤜𝤎 񏊡𝣡𝤂 𝠀񀀡𝠃𝤎𝤕񀀡𝣿𝣷 𝠀񀀒񉁩񌏁𝠃𝤮𝤙񌏁𝣴𝣴񀀒𝤙𝣻񉁩𝤙𝣟 𝠀񀕁񀕉񆇡񈩡񈩽񆇡񋺁񌀇񌀃𝠃𝤲𝤡񀕉𝣨𝤃񀕁𝤖𝤃񌀇𝣴𝣴񆇡𝤙𝣶񆇡𝣩𝣶񈩡𝤊𝣢񈩽𝣕𝣡񌀃𝣴𝣴񋺁𝣽𝣗 񏊡𝣡𝤂 𝠀񀕡𝠃𝤎𝤕񀕡𝣿𝣷 𝠀񀀒񉁩񌏁𝠃𝤮𝤙񌏁𝣴𝣴񀀒𝤙𝣻񉁩𝤙𝣟 𝠀񀂁񂇻񈟃񆕁𝠃𝤣𝤘񂇻𝤈𝤌񆕁𝣹𝤁񀂁𝤍𝣵񈟃𝣩𝣽 𝠀񀀡񋎥񀀁𝠃𝤡𝤖񀀁𝤒𝣸񀀡𝣫𝣸񋎥𝣻𝣷 𝠀񀀓񃛆񆿅񆕁𝠃𝤣𝤟񀀓𝤅𝣯񆕁𝤅𝣽񃛆𝣪𝣮񆿅𝤅𝤐 񏌁𝣢𝤂 𝠀񂇢񉳍񂇂񂇈𝠃𝤬𝤘񂇢𝤕𝣵񂇈𝣡𝣴񂇂𝣤𝣵񉳍𝣿𝣼 𝠀񀀒񀀚񋠥񋡩𝠃𝤝𝤪񋡩𝣷𝤊񀀒𝤈𝣡񋠥𝤍𝤃񀀚𝣯𝣪 𝠀񃧁񃧉񆿅񆿕񋸥𝠃𝤨𝤛񆿕𝣭𝤉񃧁𝤌𝣱񃧉𝣥𝣱񆿅𝤔𝤊񋸥𝣿𝤕 񏌁𝣢𝤂 𝠀񅡁񂇸񈗨񈗨񂇑񂇙񇀥񇀵𝠃𝤤𝤸񂇸𝣨𝣚񂇑𝤕𝤝񂇙𝣳𝤝񅡁𝣼𝣦񇀵𝣱𝣺񈗨𝤊𝣔񇀥𝤔𝣻񈗨𝤖𝣞 𝠀񄹸񈗦񄾘𝠃𝤭𝤥񄹸𝣞𝣦񄾘𝤔𝤌񈗦𝣽𝣾 𝠃𝤗𝤜񀀋𝣹𝤍񀁂𝣵𝣱 񏊡𝣡𝤂 𝠀񆅁񇅅𝠃𝤏𝤙񆅁𝣿𝣳񇅅𝣾𝤇 񏌁𝣢𝤂 𝠃𝤦𝤖񄵡𝣧𝣷񆅁𝤁𝤆񃉡𝤔𝣸 񏊡𝣡𝤂 𝠃𝤧𝤬񅩱𝤊𝤝񍳡𝣴𝣴 𝠃𝤼𝤘񃛋𝣳𝣶񃛃𝤇𝣶񈙇𝤞𝣵񈙓𝣐𝣵񆇡𝤂𝤍 񏊡𝣡𝤂 𝠀񂋣񂋫񆕁񇆡𝠃𝤜𝤞񇆡𝣹𝣯񂋣𝤁𝤆񂋫𝣱𝤋񆕁𝣿𝣿 𝠀񀟡񆄩񆕁񈟃񍩁𝠃𝤟𝥄񆄩𝤉𝤵񀟡𝤐𝤕񆕁𝤁𝤥񈟃𝣰𝤟񍩁𝣴𝣴 񏊡𝣡𝤂 𝠃𝤹𝤰񅊰𝣒𝣣񅊂𝣴𝣝񈙆𝤈𝣺񈙖𝣥𝣼񅑢𝤠𝤏񅒐𝣺𝤐 𝠀񃁁񃁉񋠩񋡭񋸡𝠃𝤦𝤬񃁁𝤇𝤝񃁉𝣥𝤑񋡭𝣯𝣨񋠩𝤌𝣵񋸡𝤀𝣠 񏌁𝣢𝤂 𝠃𝤦𝤖񄵡𝣧𝣷񆅁𝤁𝤆񃉡𝤔𝣸 𝠀񃧁񃧉񆿅񆿕񋸥𝠃𝤨𝤛񆿕𝣭𝤉񃧁𝤌𝣱񃧉𝣥𝣱񆿅𝤔𝤊񋸥𝣿𝤕 񏊡𝣡𝤂 𝠀񀀒񀀚񋠥񋡩𝠃𝤝𝤪񋡩𝣷𝤊񀀒𝤈𝣡񋠥𝤍𝤃񀀚𝣯𝣪 𝠀񅡁񂇇񉨬𝠃𝤖𝤥񂇇𝣶𝣦񅡁𝣾𝣵񉨬𝣶𝤂 𝠀񆅱񆅹񇆥񇆵񌁵𝠃𝤢𝥇񆅱𝤎𝤤񆅹𝣯𝤤񇆥𝤉𝤹񇆵𝣩𝤹񌁵𝣴𝣯 񏌁𝣢𝤂'

function App() {
  const [signs, setSigns] = useState(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem('signwriting-document')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse saved document:', e)
      }
    }
    return INITIAL_SIGNS.trim().split(/\s+/).filter(s => s.length > 0)
  })
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('signwriting-history')
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory)
      } catch (e) {
        console.error('Failed to parse saved history:', e)
      }
    }
    const initial = INITIAL_SIGNS.trim().split(/\s+/).filter(s => s.length > 0)
    return [initial]
  })
  const [historyIndex, setHistoryIndex] = useState(() => {
    const savedIndex = localStorage.getItem('signwriting-history-index')
    return savedIndex ? parseInt(savedIndex, 10) : 0
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [insertAfterIndex, setInsertAfterIndex] = useState(null)
  const [selectedSignIndex, setSelectedSignIndex] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [themeEnabled, setThemeEnabled] = useState(false)
  const fileInputRef = useRef(null)

  const vpRef = useRef(null)

  // Helper to add to history
  const updateSignsWithHistory = (newSigns) => {
    setSigns(newSigns)
    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newSigns)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)

    // Save to localStorage
    localStorage.setItem('signwriting-document', JSON.stringify(newSigns))
    localStorage.setItem('signwriting-history', JSON.stringify(newHistory))
    localStorage.setItem('signwriting-history-index', (newHistory.length - 1).toString())
  }

  // Undo function
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setSigns(history[newIndex])

      // Update localStorage
      localStorage.setItem('signwriting-document', JSON.stringify(history[newIndex]))
      localStorage.setItem('signwriting-history-index', newIndex.toString())
    }
  }

  // Redo function
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setSigns(history[newIndex])

      // Update localStorage
      localStorage.setItem('signwriting-document', JSON.stringify(history[newIndex]))
      localStorage.setItem('signwriting-history-index', newIndex.toString())
    }
  }

  useEffect(() => {
    // Handle file association when PWA is launched with .sgnw file
    if ('launchQueue' in window) {
      window.launchQueue.setConsumer((launchParams) => {
        if (launchParams.files && launchParams.files.length > 0) {
          launchParams.files[0].getFile().then((file) => {
            loadFile(file)
          })
        }
      })
    }
  }, [])

  useEffect(() => {
    const vpElement = vpRef.current
    if (!vpElement) return

    const findSignElement = (path) => {
      // Look through the composed path for a sgnw-sign or sgnw-symbol element
      for (const el of path) {
        if (el.tagName === 'SGNW-SIGN' || el.tagName === 'SGNW-SYMBOL') {
          return el
        }
      }
      return null
    }

    const getIndexFromSign = (path) => {
      // Find the sgnw-sign or sgnw-symbol element
      let signElement = null
      for (const el of path) {
        if (el.tagName === 'SGNW-SIGN' || el.tagName === 'SGNW-SYMBOL') {
          signElement = el
          break
        }
      }

      if (!signElement) {
        console.log('No sign element found in path')
        return -1
      }

      // Get all sgnw-sign elements from the viewport's shadow root
      const shadowRoot = vpElement.shadowRoot
      if (!shadowRoot) {
        console.log('No shadow root found')
        return -1
      }

      const allSigns = Array.from(shadowRoot.querySelectorAll('sgnw-sign, sgnw-symbol'))
      console.log('Found', allSigns.length, 'signs in shadow root')
      const position = allSigns.indexOf(signElement)
      console.log('Clicked sign position:', position)

      return position
    }

    const handleClick = (e) => {
      const path = e.composedPath()
      const index = getIndexFromSign(path)
      if (index !== -1) {
        setSelectedSignIndex(index)
      }
    }

    const handleDoubleClick = (e) => {
      const path = e.composedPath()
      const index = getIndexFromSign(path)
      if (index !== -1) {
        editSign(index)
      }
    }

    const handleContextMenu = (e) => {
      e.preventDefault()
      const path = e.composedPath()
      const index = getIndexFromSign(path)
      if (index !== -1) {
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
          index: index
        })
      }
    }

    const handleDragStart = (e) => {
      const path = e.composedPath()
      const index = getIndexFromSign(path)
      if (index !== -1) {
        setDraggedIndex(index)
        e.dataTransfer.effectAllowed = 'move'
      }
    }

    const handleDragOver = (e) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'

      const path = e.composedPath()
      const index = getIndexFromSign(path)
      if (index !== -1 && index !== draggedIndex) {
        setDragOverIndex(index)
      }
    }

    const handleDragEnd = () => {
      setDraggedIndex(null)
      setDragOverIndex(null)
    }

    const handleDrop = (e) => {
      e.preventDefault()

      if (draggedIndex === null) return

      const path = e.composedPath()
      const dropIndex = getIndexFromSign(path)

      if (dropIndex !== -1 && dropIndex !== draggedIndex) {
        const newSigns = [...signs]
        const [draggedSign] = newSigns.splice(draggedIndex, 1)
        newSigns.splice(dropIndex, 0, draggedSign)
        updateSignsWithHistory(newSigns)

        // Update selected index if needed
        if (selectedSignIndex === draggedIndex) {
          setSelectedSignIndex(dropIndex)
        } else if (selectedSignIndex !== null) {
          if (draggedIndex < selectedSignIndex && dropIndex >= selectedSignIndex) {
            setSelectedSignIndex(selectedSignIndex - 1)
          } else if (draggedIndex > selectedSignIndex && dropIndex <= selectedSignIndex) {
            setSelectedSignIndex(selectedSignIndex + 1)
          }
        }
      }

      setDraggedIndex(null)
      setDragOverIndex(null)
    }

    vpElement.addEventListener('click', handleClick)
    vpElement.addEventListener('dblclick', handleDoubleClick)
    vpElement.addEventListener('contextmenu', handleContextMenu)
    vpElement.addEventListener('dragstart', handleDragStart)
    vpElement.addEventListener('dragover', handleDragOver)
    vpElement.addEventListener('dragend', handleDragEnd)
    vpElement.addEventListener('drop', handleDrop)

    return () => {
      vpElement.removeEventListener('click', handleClick)
      vpElement.removeEventListener('dblclick', handleDoubleClick)
      vpElement.removeEventListener('contextmenu', handleContextMenu)
      vpElement.removeEventListener('dragstart', handleDragStart)
      vpElement.removeEventListener('dragover', handleDragOver)
      vpElement.removeEventListener('dragend', handleDragEnd)
      vpElement.removeEventListener('drop', handleDrop)
    }
  }, [signs, draggedIndex])

  // Close context menu and clear selection when clicking anywhere outside
  useEffect(() => {
    const handleClick = (e) => {
      setContextMenu(null)

      // Check if click is outside the viewport
      const vpElement = vpRef.current
      if (vpElement && !vpElement.contains(e.target)) {
        setSelectedSignIndex(null)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Update selected styles and draggable attribute on signs in shadow DOM
  useEffect(() => {
    const vpElement = vpRef.current
    if (!vpElement) return

    // Use a small delay to ensure shadow DOM is updated after signs change
    const timeout = setTimeout(() => {
      if (!vpElement.shadowRoot) return

      const allSigns = Array.from(vpElement.shadowRoot.querySelectorAll('sgnw-sign, sgnw-symbol'))

      allSigns.forEach((sign, index) => {
        // Make draggable
        sign.setAttribute('draggable', 'true')

        // Apply selection styles
        if (index === selectedSignIndex) {
          sign.style.outline = '3px solid #ef4444'
          sign.style.outlineOffset = '2px'
          sign.style.backgroundColor = '#fef2f2'
          sign.style.borderRadius = '4px'
        } else {
          sign.style.outline = ''
          sign.style.outlineOffset = ''
          sign.style.backgroundColor = ''
          sign.style.borderRadius = ''
        }

        // Apply drag styles
        if (index === draggedIndex) {
          sign.style.opacity = '0.5'
        } else if (index === dragOverIndex) {
          sign.style.borderLeft = '3px solid #3b82f6'
        } else {
          sign.style.opacity = ''
          sign.style.borderLeft = ''
        }
      })

      // Apply theme styles to sgnw-vp
      if (themeEnabled) {
        vpElement.style.border = 'none'

        // Apply styles to span elements inside shadow DOM
        const outsideSpans = vpElement.shadowRoot.querySelectorAll('span.outside')
        const insideSpans = vpElement.shadowRoot.querySelectorAll('span.inside')

        outsideSpans.forEach(span => {
          span.style.border = 'none'
        })

        insideSpans.forEach(span => {
          span.style.border = 'none'
        })
      } else {
        vpElement.style.border = ''

        // Reset styles
        const outsideSpans = vpElement.shadowRoot.querySelectorAll('span.outside')
        const insideSpans = vpElement.shadowRoot.querySelectorAll('span.inside')

        outsideSpans.forEach(span => {
          span.style.border = ''
        })

        insideSpans.forEach(span => {
          span.style.border = ''
        })
      }
    }, 10)

    return () => clearTimeout(timeout)
  }, [selectedSignIndex, signs, draggedIndex, dragOverIndex, themeEnabled])

  // Keyboard shortcuts for undo/redo and selection
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Undo/Redo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
        return
      }

      // Arrow key navigation
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        if (selectedSignIndex === null) {
          setSelectedSignIndex(signs.length - 1)
        } else if (selectedSignIndex > 0) {
          setSelectedSignIndex(selectedSignIndex - 1)
        }
        return
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        if (selectedSignIndex === null) {
          setSelectedSignIndex(0)
        } else if (selectedSignIndex < signs.length - 1) {
          setSelectedSignIndex(selectedSignIndex + 1)
        }
        return
      }

      // Delete key
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedSignIndex !== null) {
          e.preventDefault()
          deleteSign(selectedSignIndex)
        }
        return
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [historyIndex, history, selectedSignIndex, signs.length])

  const addNewSign = () => {
    // If a sign is selected, we'll insert after it
    setEditingIndex(null)
    if (selectedSignIndex !== null) {
      setInsertAfterIndex(selectedSignIndex)
    } else {
      setInsertAfterIndex(null)
    }
    setIsModalOpen(true)
  }

  const editSign = (index) => {
    setEditingIndex(index)
    setInsertAfterIndex(null)
    setIsModalOpen(true)
  }

  const handleSignUpdate = (signData) => {
    if (editingIndex !== null) {
      // Editing existing sign
      const newSigns = [...signs]
      newSigns[editingIndex] = signData
      updateSignsWithHistory(newSigns)
    } else if (insertAfterIndex !== null) {
      // Inserting after selected sign
      const newSigns = [...signs]
      newSigns.splice(insertAfterIndex + 1, 0, signData)
      updateSignsWithHistory(newSigns)
      setSelectedSignIndex(insertAfterIndex + 1) // Select the newly inserted sign
    } else {
      // Adding to end
      updateSignsWithHistory([...signs, signData])
      setSelectedSignIndex(signs.length) // Select the new sign at the end
    }
    setIsModalOpen(false)
    setEditingIndex(null)
    setInsertAfterIndex(null)
  }

  const copySign = (index) => {
    if (index >= 0 && index < signs.length) {
      updateSignsWithHistory([...signs.slice(0, index + 1), signs[index], ...signs.slice(index + 1)])
    }
  }

  const deleteSign = (index) => {
    updateSignsWithHistory(signs.filter((_, i) => i !== index))

    // Update selected index after deletion
    if (selectedSignIndex === index) {
      // Try to select previous, otherwise next, otherwise null
      if (index > 0) {
        setSelectedSignIndex(index - 1)
      } else if (signs.length > 1) {
        setSelectedSignIndex(0) // Next item will shift to index 0
      } else {
        setSelectedSignIndex(null)
      }
    } else if (selectedSignIndex !== null && selectedSignIndex > index) {
      // Adjust selected index if it's after the deleted item
      setSelectedSignIndex(selectedSignIndex - 1)
    }
  }

  const saveFile = () => {
    const swuText = signs.join(' ')
    const blob = new Blob([swuText], { type: 'application/x-signwriting' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.sgnw'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const loadFile = async (file) => {
    const text = await file.text()
    const signArray = text.trim().split(/\s+/).filter(s => s.length > 0)
    updateSignsWithHistory(signArray)
  }

  const handleFileLoad = (e) => {
    const file = e.target.files[0]
    if (file) {
      loadFile(file)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="app">
      <header className="toolbar">
        <h1>SignWriting Word Processor</h1>
        <div className="toolbar-buttons">
          <button onClick={addNewSign} title="Add New Sign" className="icon-button">
            ➕
          </button>
          <div className="toolbar-separator"></div>
          <button onClick={undo} disabled={historyIndex === 0} title="Undo (Ctrl+Z)" className="icon-button">
            ◀
          </button>
          <button onClick={redo} disabled={historyIndex === history.length - 1} title="Redo (Ctrl+Shift+Z)" className="icon-button">
            ▶
          </button>
          <div className="toolbar-separator"></div>
          <button onClick={saveFile} disabled={signs.length === 0} title="Save" className="icon-button">
            💾
          </button>
          <button onClick={() => fileInputRef.current?.click()} title="Open" className="icon-button">
            📂
          </button>
          <div className="toolbar-separator"></div>
          <button
            onClick={() => setThemeEnabled(!themeEnabled)}
            title={themeEnabled ? "Disable Clean Theme" : "Enable Clean Theme"}
            className="icon-button"
            style={themeEnabled ? { backgroundColor: '#e5e7eb' } : {}}
          >
            {themeEnabled ? '🎨' : '🖼️'}
          </button>
          <div className="toolbar-separator"></div>
          <button onClick={handlePrint} title="Print (Ctrl+P)" className="icon-button">
            🖨️
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".sgnw"
            style={{ display: 'none' }}
            onChange={handleFileLoad}
          />
        </div>
      </header>

      <div className="document">
        <sgnw-vp
          ref={vpRef}
          className="viewport"
          key={signs.join('|')}
        >
          {signs.map((sign, index) => (
            <div
              key={`${sign}-${index}`}
              className={`sign-wrapper ${selectedSignIndex === index ? 'selected' : ''}`}
              onClick={() => setSelectedSignIndex(index)}
              data-sign-index={index}
            >
              <sgnw-sign swu={sign} key={`${sign}-${index}`} data-sign-index={index}></sgnw-sign>
              <div className="sign-actions">
                <button onClick={(e) => { e.stopPropagation(); editSign(index) }}>Edit</button>
                <button onClick={(e) => { e.stopPropagation(); copySign(index) }}>Copy</button>
                <button onClick={(e) => { e.stopPropagation(); deleteSign(index) }}>Delete</button>
              </div>
            </div>
          ))}
        </sgnw-vp>
      </div>

      <SignMakerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingIndex(null)
          setInsertAfterIndex(null)
        }}
        onSignUpdate={handleSignUpdate}
        initialSign={editingIndex !== null ? signs[editingIndex] : null}
      />

      {contextMenu && (
        <div
          className="context-menu"
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            zIndex: 1000
          }}
        >
          <button onClick={() => {
            editSign(contextMenu.index)
            setContextMenu(null)
          }}>Edit</button>
          <button onClick={() => {
            deleteSign(contextMenu.index)
            setContextMenu(null)
          }}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default App
