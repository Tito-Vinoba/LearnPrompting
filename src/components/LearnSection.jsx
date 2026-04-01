import { useState } from 'react'
import { learnContent } from '../data/promptTemplates.js'
import './LearnSection.css'

function renderContent(text) {
  // Convert **bold**, `code`, and line breaks
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <strong key={i}>{line.slice(2, -2)}</strong>
    }
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={j} className="inline-code">{part.slice(1, -1)}</code>
      }
      return part
    })
    if (line === '') return <br key={i} />
    if (line.startsWith('> ')) {
      return <blockquote key={i} className="learn-blockquote">{line.slice(2)}</blockquote>
    }
    return <p key={i}>{rendered}</p>
  })
}

function LessonCard({ lesson }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className={`lesson-card ${expanded ? 'expanded' : ''}`}>
      <button className="lesson-header" onClick={() => setExpanded(!expanded)}>
        <span className="lesson-title">{lesson.title}</span>
        <span className={`lesson-chevron ${expanded ? 'open' : ''}`}>›</span>
      </button>
      {expanded && (
        <div className="lesson-body">
          <div className="lesson-content">
            {renderContent(lesson.content)}
          </div>
        </div>
      )}
    </div>
  )
}

export default function LearnSection() {
  const [activeCategory, setActiveCategory] = useState('basics')

  const current = learnContent.find(c => c.id === activeCategory)

  return (
    <div className="learn-page">
      <div className="section-container">
        <div className="section-header">
          <div className="badge" style={{ background: '#ecfdf5', color: '#10b981' }}>
            ◈ Learn
          </div>
          <h2>Master Prompt Engineering</h2>
          <p>From fundamentals to advanced techniques — everything you need to write prompts that get results.</p>
        </div>

        <div className="learn-layout">
          {/* Sidebar */}
          <div className="learn-sidebar">
            {learnContent.map(cat => (
              <button
                key={cat.id}
                className={`sidebar-item ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                style={{ '--cat-color': cat.color }}
              >
                <span className="sidebar-icon">{cat.icon}</span>
                <span>{cat.title}</span>
                <span className="sidebar-count">{cat.lessons.length}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="learn-content">
            <div className="learn-content-header" style={{ '--cat-color': current.color }}>
              <div className="learn-content-icon" style={{ background: `${current.color}18`, color: current.color }}>
                {current.icon}
              </div>
              <div>
                <h3>{current.title}</h3>
                <p>{current.lessons.length} lessons</p>
              </div>
            </div>

            <div className="lessons-list">
              {current.lessons.map((lesson, i) => (
                <LessonCard key={i} lesson={lesson} />
              ))}
            </div>
          </div>
        </div>

        {/* Progress / cheatsheet */}
        <div className="cheatsheet-section">
          <h3>Quick Reference Cheatsheet</h3>
          <div className="cheatsheet-grid">
            {[
              { label: 'Add Role', example: '"You are an expert [role]..."', color: '#6366f1' },
              { label: 'Specify Format', example: '"Return as JSON with keys: ..."', color: '#10b981' },
              { label: 'Chain-of-Thought', example: '"Think step by step..."', color: '#f59e0b' },
              { label: 'Few-Shot', example: '"Example 1: ... → ...\nNow do: ..."', color: '#ec4899' },
              { label: 'Set Constraints', example: '"Under 100 words. No jargon."', color: '#8b5cf6' },
              { label: 'Ask to Verify', example: '"Check your answer for errors..."', color: '#06b6d4' },
            ].map(item => (
              <div key={item.label} className="cheatsheet-card" style={{ '--c': item.color }}>
                <span className="cheatsheet-label">{item.label}</span>
                <code className="cheatsheet-example">{item.example}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
