import { HashRouter, Routes, Route, useLocation, useParams } from 'react-router-dom'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Results from './pages/Results'
import Profile from './pages/Profile'
import About from './pages/About'
import { BottomNav } from './components/ui'

function KeyedLesson() {
  // força remontar ao trocar de lição, mesmo sem sair da rota /licao/:lessonId
  const { lessonId } = useParams()
  return <Lesson key={lessonId} />
}

function Shell() {
  const { pathname } = useLocation()
  // dentro da lição/resultado o foco é total: sem nav inferior
  const immersive = pathname.startsWith('/licao') || pathname.startsWith('/resultado')
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/licao/:lessonId" element={<KeyedLesson />} />
        <Route path="/resultado/:lessonId" element={<Results />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/sobre" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!immersive && <BottomNav />}
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}
