import { NavLink } from 'react-router-dom'
import { Map, User, Info } from 'lucide-react'
import { useProgress } from '../store/progress'

/** Chama pixelada de streak (SVG próprio, sem emoji) */
export function Flame({ size = 20, lit = true }: { size?: number; lit?: boolean }) {
  const c = lit ? 'var(--color-brand)' : 'var(--color-locked)'
  const core = lit ? 'var(--color-gold)' : 'var(--color-surface-2)'
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden shapeRendering="crispEdges">
      <rect x="5" y="0" width="2" height="2" fill={c} />
      <rect x="4" y="2" width="3" height="2" fill={c} />
      <rect x="7" y="3" width="2" height="1" fill={c} />
      <rect x="3" y="4" width="6" height="2" fill={c} />
      <rect x="2" y="6" width="8" height="4" fill={c} />
      <rect x="3" y="10" width="6" height="2" fill={c} />
      <rect x="5" y="7" width="2" height="3" fill={core} />
      <rect x="4" y="9" width="4" height="2" fill={core} />
    </svg>
  )
}

/** Cabeçalho com XP e streak, presente na trilha e no perfil */
export function StatsBar() {
  const xp = useProgress((s) => s.xp)
  const streak = useProgress((s) => s.currentStreak())
  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-1.5" title="Streak de dias" aria-label={`Streak: ${streak} dias`}>
        <Flame lit={streak > 0} />
        <span className={`font-pixel text-sm ${streak > 0 ? 'text-brand' : 'text-locked'}`}>{streak}</span>
      </span>
      <span className="flex items-center gap-1.5" title="XP total" aria-label={`${xp} XP`}>
        <span className="font-pixel text-sm text-gold">{xp}</span>
        <span className="text-xs font-extrabold text-muted">XP</span>
      </span>
    </div>
  )
}

const tabs = [
  { to: '/', label: 'Trilha', icon: Map },
  { to: '/perfil', label: 'Perfil', icon: User },
  { to: '/sobre', label: 'Sobre', icon: Info },
]

export function BottomNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-edge bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex max-w-[480px]">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-extrabold ${
                isActive ? 'text-brand' : 'text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} aria-hidden />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
