import { useState } from 'react'
import { categories, promptConfig } from '../data/promptTemplates.js'
import './PromptGenerator.css'

function Toast({ message, onDone }) {
  return <div className="toast">{message}</div>
}

export default function PromptGenerator() {
  const [selectedCategory, setSelectedCategory] = useState('coding')
  const [formValues, setFormValues] = useState({})
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [toast, setToast] = useState(null)

  const config = promptConfig[selectedCategory]

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId)
    setFormValues({})
    setGeneratedPrompt('')
  }

  const handleFieldChange = (fieldId, value) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }))
  }

  const handleCheckboxToggle = (fieldId, option) => {
    setFormValues(prev => {
      const current = prev[fieldId] || []
      const exists = current.includes(option)
      return {
        ...prev,
        [fieldId]: exists ? current.filter(o => o !== option) : [...current, option],
      }
    })
  }

  const handleGenerate = () => {
    const prompt = config.generate(formValues)
    setGeneratedPrompt(prompt)
    setTimeout(() => {
      document.getElementById('prompt-output')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      showToast('Prompt copied to clipboard!')
    })
  }

  const handleClear = () => {
    setFormValues({})
    setGeneratedPrompt('')
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const isFormValid = () => {
    const requiredFields = config.fields.filter(f => f.type !== 'checkboxes' && f.type !== 'textarea')
    return requiredFields.every(f => formValues[f.id])
  }

  return (
    <div className="generator-page">
      <div className="generator-container">
        {/* Page header */}
        <div className="generator-header">
          <div className="badge" style={{ background: '#eef2ff', color: '#6366f1' }}>
            ✦ Prompt Generator
          </div>
          <h1>Generate AI Prompts</h1>
          <p>Select a category, fill in the options, and get a production-ready prompt to copy into any AI tool.</p>
        </div>

        {/* Category selector */}
        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
              style={{
                '--cat-color': cat.color,
                '--cat-bg': cat.bg,
              }}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="generator-body">
          {/* Left: form */}
          <div className="generator-form card">
            <div className="form-header">
              <h2>{config.title}</h2>
              <p>{config.description}</p>
            </div>

            <div className="fields-grid">
              {config.fields.map(field => (
                <div
                  key={field.id}
                  className={`form-group ${field.type === 'textarea' || field.type === 'checkboxes' ? 'full-width' : ''}`}
                >
                  <label className="form-label">{field.label}</label>

                  {field.type === 'select' && (
                    <select
                      className="form-select"
                      value={formValues[field.id] || ''}
                      onChange={e => handleFieldChange(field.id, e.target.value)}
                    >
                      <option value="">Select an option...</option>
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      className="form-textarea"
                      placeholder={field.placeholder}
                      value={formValues[field.id] || ''}
                      onChange={e => handleFieldChange(field.id, e.target.value)}
                      rows={4}
                    />
                  )}

                  {field.type === 'checkboxes' && (
                    <div className="checkbox-group">
                      {field.options.map(opt => {
                        const checked = (formValues[field.id] || []).includes(opt)
                        return (
                          <label
                            key={opt}
                            className={`checkbox-pill ${checked ? 'checked' : ''}`}
                            onClick={() => handleCheckboxToggle(field.id, opt)}
                          >
                            <input type="checkbox" checked={checked} readOnly />
                            {checked ? '✓ ' : ''}{opt}
                          </label>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button
                className="btn btn-primary generate-btn"
                onClick={handleGenerate}
                disabled={!isFormValid()}
              >
                <span>✦</span> Generate Prompt
              </button>
              <button className="btn btn-ghost" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>

          {/* Right: output */}
          <div className="generator-output" id="prompt-output">
            {generatedPrompt ? (
              <div className="output-card card">
                <div className="output-header">
                  <div className="output-title">
                    <span className="output-dot" style={{ background: categories.find(c => c.id === selectedCategory)?.color }} />
                    Generated Prompt
                  </div>
                  <div className="output-actions">
                    <button className="icon-btn" onClick={handleCopy} title="Copy to clipboard">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
                <pre className="output-text">{generatedPrompt}</pre>
                <div className="output-footer">
                  <div className="output-meta">
                    <span>{generatedPrompt.split(' ').length} words</span>
                    <span>·</span>
                    <span>{generatedPrompt.length} chars</span>
                  </div>
                  <button className="copy-btn-large" onClick={handleCopy}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy Prompt
                  </button>
                </div>
              </div>
            ) : (
              <div className="output-empty card">
                <div className="empty-icon">✦</div>
                <h3>Your prompt will appear here</h3>
                <p>Fill in the options on the left and click <strong>Generate Prompt</strong> to create a tailored AI prompt ready to use.</p>
                <div className="tips">
                  <p className="tips-label">Quick tips:</p>
                  <ul>
                    <li>Select a category tab above to switch between prompt types</li>
                    <li>Fill in more fields for a more detailed prompt</li>
                    <li>Use the checkboxes to add extra requirements</li>
                    <li>Generated prompts work with ChatGPT, Claude, Gemini, and more</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  )
}
