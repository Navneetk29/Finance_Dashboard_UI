import React, { createContext, useContext, useState } from 'react'
import { Search, Bell, Settings, Shield, Eye, Home, PieChart, Wallet, CreditCard, LayoutDashboard } from 'lucide-react'
import Dashboard from './Dashboard'

// --- Role Context ---
export type Role = 'admin' | 'viewer'
type RoleContextType = { role: Role, setRole: (r: Role) => void }

const RoleContext = createContext<RoleContextType>({ role: 'admin', setRole: () => { } })
export const useRole = () => useContext(RoleContext)

// --- Sidebar Component ---
const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Wallet, label: 'Accounts', active: false },
  { icon: PieChart, label: 'Investments', active: false },
  { icon: CreditCard, label: 'Cards', active: false },
  { icon: Settings, label: 'Settings', active: false },
]

const Sidebar = () => (
  <aside className="w-64 glass-panel border-l-0 border-y-0 rounded-none hidden md:flex flex-col h-screen sticky top-0">
    <div className="p-6 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.6)]">
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      <span className="text-xl font-bold tracking-tight text-white">VaultFinance</span>
    </div>

    <nav className="flex-1 px-4 mt-6 space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <a key={item.label} href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${item.active ? 'bg-blue-600/15 text-blue-400 font-medium border border-blue-500/20 shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transparent border border-transparent'}`}>
            <Icon size={20} className={item.active ? 'text-blue-400' : 'text-gray-500'} />
            {item.label}
          </a>
        )
      })}
    </nav>

    <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/20 rounded-full blur-xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
      <p className="text-sm font-bold text-white mb-1 relative z-10">Upgrade to Pro</p>
      <p className="text-xs text-blue-200/80 mb-4 relative z-10">Get advanced analytics limits.</p>
      <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all shadow-md relative z-10 active:scale-95">Upgrade Now</button>
    </div>
  </aside>
)

// --- Header Component ---
const Header = () => {
  const { role, setRole } = useRole()
  return (
    <header className="h-[88px] px-8 flex items-center justify-between glass-panel border-x-0 border-t-0 rounded-none z-10 sticky top-0">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-500" size={18} />
          <input type="text" placeholder="Search accounts..." className="w-full bg-gray-900/50 border border-gray-800 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500/50 transition-all text-white" />
        </div>
      </div>
      <div className="flex items-center gap-4 ml-4">
        <div className="flex items-center gap-1 bg-gray-900/60 p-1 rounded-xl border border-gray-800">
          <button onClick={() => setRole('admin')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${role === 'admin' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}><Shield size={14} /> Admin</button>
          <button onClick={() => setRole('viewer')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${role === 'viewer' ? 'bg-gray-700 text-white shadow-md' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}><Eye size={14} /> Viewer</button>
        </div>
        <div className="h-8 w-px bg-gray-800 mx-2"></div>
        <button className="w-10 h-10 rounded-full bg-gray-800/40 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-all relative"><Bell size={18} /><span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span></button>
        <button className="w-10 h-10 rounded-full bg-gray-800/40 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-all"><Settings size={18} /></button>
        <div className="h-8 w-px bg-gray-800 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer group hover:bg-gray-800/30 py-1.5 px-2 rounded-xl transition-all">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-[2px] shadow-sm">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent" alt="User profile" className="w-full h-full rounded-full bg-gray-950 object-cover" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Alex Morgan</p>
            <p className="text-xs text-gray-500 font-medium">Premium Member</p>
          </div>
        </div>
      </div>
    </header>
  )
}

// --- App Entry & Layout ---
export default function App() {
  const [role, setRole] = useState<Role>('admin')
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <div className="flex bg-gray-950 text-gray-100 min-h-screen font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-950 px-4 py-8">
            <div className="max-w-7xl mx-auto">
              <Dashboard />
            </div>
          </main>
        </div>
      </div>
    </RoleContext.Provider>
  )
}
