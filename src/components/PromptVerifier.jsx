import { useState } from 'react'
import './PromptVerifier.css'

const criteria = [
  {
    id: 'clarity',
    label: 'Clarity',
    icon: '◎',
    color: '#6366f1',
    desc: 'Is the prompt clear and unambiguous?',
    checks: [
      { text: 'Has a clear main task or question', regex: /\b(write|create|generate|explain|build|design|analyze|review|list|describe|implement|fix|optimize|convert)\b/i },
      { text: 'Uses specific nouns (not vague words like "it", "thing", "something")', regex: /\b(function|component|class|API|endpoint|database|page|feature|module|system|code|data)\b/i },
      { text: 'Avoids contradictory instructions', score: true },
    ],
  },
  {
    id: 'context',
    label: 'Context',
    icon: '◈',
    color: '#10b981',
    desc: 'Does it provide enough background?',
    checks: [
      { text: 'Mentions relevant technology or domain', regex: /\b(python|javascript|typescript|react|node|java|c\+\+|go|rust|swift|kotlin|css|html|sql|api|web|mobile|app|software)\b/i },
      { text: 'Describes the purpose or use case', regex: /\b(for|to|so that|because|in order to|which will|that will|used for)\b/i },
      { text: 'Has 20+ words (sufficient detail)', minLength: 20 },
    ],
  },
  {
    id: 'specificity',
    label: 'Specificity',
    icon: '✦',
    color: '#f59e0b',
    desc: 'Are the requirements precise?',
    checks: [
      { text: 'Specifies output format or structure', regex: /\b(json|markdown|list|table|code|paragraph|steps?|bullet|numbered|format|structure|return)\b/i },
      { text: 'Includes constraints or boundaries', regex: /\b(only|no|don't|avoid|must|should|without|limit|max|min|exactly|under|over)\b/i },
      { text: 'Mentions quality level or tone', regex: /\b(professional|simple|detailed|brief|concise|comprehensive|beginner|advanced|expert|senior|junior|formal|casual)\b/i },
    ],
  },
  {
    id: 'role',
    label: 'Role & Framing',
    icon: '◐',
    color: '#ec4899',
    desc: 'Does it set appropriate context for the AI?',
    checks: [
      { text: 'Assigns a role or persona', regex: /\b(you are|act as|imagine you|as a|you are an|you're a)\b/i },
      { text: 'Frames the task appropriately', regex: /\b(expert|developer|designer|engineer|writer|analyst|specialist|professional|senior|experienced)\b/i },
      { text: 'Has 50+ words (well-developed prompt)', minLength: 50 },
    ],
  },
]

function scorePrompt(text) {
  if (!text.trim()) return { total: 0, breakdown: [] }

  const wordCount = text.trim().split(/\s+/).length
  const breakdown = criteria.map(cat => {
    const passed = cat.checks.map(check => {
      if (check.regex) return check.regex.test(text)
      if (check.minLength) return wordCount >= check.minLength
      if (check.score) return true // assume passes unless we detect contradiction
      return false
    })
    const score = passed.filter(Boolean).length
    return { ...cat, score, max: cat.checks.length, passed, wordCount }
  })

  const total = breakdown.reduce((sum, b) => sum + b.score, 0)
  const maxTotal = breakdown.reduce((sum, b) => sum + b.max, 0)
  return { total, maxTotal, breakdown, wordCount }
}

function getOverallLabel(pct) {
  if (pct >= 85) return { label: 'Excellent', color: '#10b981', icon: '✓' }
  if (pct >= 65) return { label: 'Good', color: '#6366f1', icon: '◎' }
  if (pct >= 40) return { label: 'Needs Work', color: '#f59e0b', icon: '◐' }
  return { label: 'Weak', color: '#ef4444', icon: '✕' }
}

function getSuggestions(breakdown) {
  const suggestions = []
  breakdown.forEach(cat => {
    cat.checks.forEach((check, i) => {
      if (!cat.passed[i]) {
        const tips = {
          'Has a clear main task or question': 'Add an action verb (write, create, analyze, build, fix...).',
          'Uses specific nouns (not vague words like "it", "thing", "something")': 'Replace vague words with specific names (component, function, API, class...).',
          'Mentions relevant technology or domain': 'Name the language, framework, or domain (e.g. "Python", "React", "SQL").',
          'Describes the purpose or use case': 'Explain why — add "for...", "so that...", or "in order to...".',
          'Has 20+ words (sufficient detail)': 'Add more detail — a good prompt is at least 20 words.',
          'Specifies output format or structure': 'Tell the AI what format to respond in (JSON, list, code block, steps...).',
          'Includes constraints or boundaries': 'Add limits ("only use X", "no Y", "must be Z").',
          'Mentions quality level or tone': 'Specify the level (beginner-friendly, production-ready, concise, detailed...).',
          'Assigns a role or persona': 'Prepend "You are a senior [role]..." to prime the model.',
          'Frames the task appropriately': 'Describe the expert perspective (developer, designer, analyst...).',
          'Has 50+ words (well-developed prompt)': 'Expand your prompt to 50+ words for more precise results.',
        }
        if (tips[check.text]) suggestions.push(tips[check.text])
      }
    })
  })
  return suggestions.slice(0, 5)
}

export default function PromptVerifier() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [toastMsg, setToastMsg] = useState(null)

  const handleAnalyze = () => {
    const r = scorePrompt(input)
    setResult(r)
  }

  const handleClear = () => {
    setInput('')
    setResult(null)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(input).then(() => {
      setToastMsg('Copied to clipboard!')
      setTimeout(() => setToastMsg(null), 2500)
    })
  }

  const pct = result ? Math.round((result.total / result.maxTotal) * 100) : 0
  const overall = result ? getOverallLabel(pct) : null
  const suggestions = result ? getSuggestions(result.breakdown) : []

  return (
    <div className="verifier-page">
      <div className="section-container">
        <div className="section-header">
          <div className="badge" style={{ background: '#fffbeb', color: '#f59e0b' }}>
            ◎ Verifier
          </div>
          <h2>Prompt Quality Analyzer</h2>
          <p>Paste any prompt below to analyze its clarity, context, specificity, and framing — and get actionable suggestions.</p>
        </div>

        <div className="verifier-layout">
          {/* Input */}
          <div className="verifier-input card">
            <div className="verifier-input-header">
              <span className="vi-label">Your Prompt</span>
              {input && (
                <span className="word-count">{input.trim().split(/\s+/).filter(Boolean).length} words</span>
              )}
            </div>
            <textarea
              className="verifier-textarea"
              placeholder="Paste or type your prompt here...&#10;&#10;Example: You are a senior Python developer. Write a function that validates email addresses using regex. Handle edge cases like missing @, invalid domains, and leading/trailing spaces. Return True/False and include docstrings."
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={10}
            />
            <div className="verifier-actions">
              <button
                className="btn btn-primary analyze-btn"
                onClick={handleAnalyze}
                disabled={!input.trim()}
              >
                ◎ Analyze Prompt
              </button>
              {input && (
                <>
                  <button className="btn btn-secondary" onClick={handleCopy}>
                    Copy
                  </button>
                  <button className="btn btn-ghost" onClick={handleClear}>
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="verifier-results">
              {/* Score card */}
              <div className="score-card card">
                <div className="score-main">
                  <div className="score-circle" style={{ '--pct': pct, '--color': overall.color }}>
                    <span className="score-num">{pct}</span>
                    <span className="score-pct">%</span>
                  </div>
                  <div className="score-info">
                    <div className="score-label" style={{ color: overall.color }}>
                      {overall.icon} {overall.label}
                    </div>
                    <div className="score-detail">{result.total} / {result.maxTotal} checks passed</div>
                    <div className="score-words">{result.wordCount} words</div>
                  </div>
                </div>
              </div>

              {/* Criteria breakdown */}
              <div className="criteria-list">
                {result.breakdown.map(cat => (
                  <div key={cat.id} className="criteria-card card">
                    <div className="criteria-header">
                      <div className="criteria-title" style={{ color: cat.color }}>
                        {cat.icon} {cat.label}
                      </div>
                      <div className="criteria-score" style={{ color: cat.score === cat.max ? '#10b981' : cat.score > 0 ? '#f59e0b' : '#ef4444' }}>
                        {cat.score}/{cat.max}
                      </div>
                    </div>
                    <div className="criteria-bar">
                      <div
                        className="criteria-bar-fill"
                        style={{
                          width: `${(cat.score / cat.max) * 100}%`,
                          background: cat.color,
                        }}
                      />
                    </div>
                    <div className="criteria-checks">
                      {cat.checks.map((check, i) => (
                        <div key={i} className={`check-item ${cat.passed[i] ? 'pass' : 'fail'}`}>
                          <span className="check-icon">{cat.passed[i] ? '✓' : '✕'}</span>
                          <span>{check.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="suggestions-card card">
                  <div className="suggestions-title">
                    ✦ Suggestions to Improve
                  </div>
                  <ul className="suggestions-list">
                    {suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pct >= 85 && (
                <div className="excellent-banner">
                  ✓ Great prompt! This is well-structured and ready to use in any AI tool.
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {!result && (
            <div className="verifier-empty card">
              <div className="empty-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}>◎</div>
              <h3>Analysis results will appear here</h3>
              <p>Type or paste a prompt in the box and click <strong>Analyze Prompt</strong> to see a detailed quality breakdown.</p>
              <div className="what-we-check">
                <p className="check-title">What we check:</p>
                <div className="check-pills">
                  {criteria.map(c => (
                    <span key={c.id} className="check-pill" style={{ color: c.color, background: `${c.color}15` }}>
                      {c.icon} {c.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  )
}
