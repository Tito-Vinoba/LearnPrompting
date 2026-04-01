import './Header.css'

const tabs = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'generator', label: 'Generator', icon: '✦' },
  { id: 'learn', label: 'Learn', icon: '◈' },
  { id: 'verifier', label: 'Verifier', icon: '◎' },
]

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="header">
      <div className="header-inner">
        <button className="logo" onClick={() => setActiveTab('home')}>
          <span className="logo-icon">✦</span>
          <span className="logo-text">PromptCraft</span>
        </button>

        <nav className="nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <button
          className="cta-btn"
          onClick={() => setActiveTab('generator')}
        >
          Generate Prompt
        </button>
      </div>
    </header>
  )
}
