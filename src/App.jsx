import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import PromptGenerator from './components/PromptGenerator.jsx'
import LearnSection from './components/LearnSection.jsx'
import PromptVerifier from './components/PromptVerifier.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('generator')

  return (
    <div className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}
        {activeTab === 'generator' && <PromptGenerator />}
        {activeTab === 'learn' && <LearnSection />}
        {activeTab === 'verifier' && <PromptVerifier />}
      </main>
      <Footer />
    </div>
  )
}
