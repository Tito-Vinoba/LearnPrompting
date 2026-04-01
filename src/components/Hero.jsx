import './Hero.css'

const features = [
  {
    icon: '✦',
    title: 'Prompt Generator',
    desc: 'Generate high-quality prompts for coding, design, ideas, and product documentation in seconds.',
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    icon: '◈',
    title: 'Learn Prompting',
    desc: 'Master prompt engineering from basics to advanced techniques with practical examples.',
    color: '#10b981',
    bg: '#ecfdf5',
  },
  {
    icon: '◎',
    title: 'Prompt Verifier',
    desc: 'Analyze and score your prompts for clarity, specificity, and effectiveness before using them.',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
]

const stats = [
  { value: '4', label: 'Prompt Categories' },
  { value: '50+', label: 'Prompt Templates' },
  { value: '10+', label: 'Techniques Covered' },
  { value: '100%', label: 'Free to Use' },
]

export default function Hero({ setActiveTab }) {
  return (
    <div className="hero-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-bg-blob blob-1" />
        <div className="hero-bg-blob blob-2" />
        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span> The AI Prompt Toolkit
          </div>
          <h1 className="hero-title">
            Learn, Generate &<br />
            <span className="gradient-text">Master AI Prompts</span>
          </h1>
          <p className="hero-subtitle">
            Everything you need to write better prompts — generate production-ready prompts
            for coding, design, ideas, and docs, then learn the techniques behind them.
          </p>
          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={() => setActiveTab('generator')}>
              <span>✦</span> Start Generating
            </button>
            <button className="hero-btn-secondary" onClick={() => setActiveTab('learn')}>
              <span>◈</span> Learn Prompting
            </button>
          </div>
          <div className="hero-stats">
            {stats.map(s => (
              <div key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2>Everything in one place</h2>
            <p>Three powerful tools designed to help you get the most out of AI models.</p>
          </div>
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className="feature-card" style={{ '--accent-color': f.color, '--accent-bg': f.bg }}>
                <div className="feature-icon" style={{ background: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-cta-section">
        <div className="hero-cta-inner">
          <h2>Ready to write better prompts?</h2>
          <p>Jump straight into the generator and create your first prompt in under 30 seconds.</p>
          <button className="hero-btn-primary large" onClick={() => setActiveTab('generator')}>
            Open Prompt Generator →
          </button>
        </div>
      </section>
    </div>
  )
}
