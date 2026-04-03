import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Activity, Target, TrendingDown, TrendingUp, Info, Coffee, ShoppingBag, MoreHorizontal, Apple, Search, Send, ChevronDown } from 'lucide-react'
import { useRole } from './App'

// --- Dashboard Sub-Components ---
const StatCards = () => {
    const stats = [
        { title: 'Total Balance', value: '$124,563.00', change: '+14.5%', isPositive: true, icon: DollarSign, color: 'from-blue-500 to-blue-600' },
        { title: 'Monthly Income', value: '$12,450.00', change: '+8.2%', isPositive: true, icon: Activity, color: 'from-emerald-500 to-emerald-600' },
        { title: 'Monthly Expenses', value: '$4,234.00', change: '-2.4%', isPositive: false, icon: CreditCard, color: 'from-rose-500 to-rose-600' },
        { title: 'Savings Goal', value: '$65,000.00', change: '+1.2%', isPositive: true, icon: Target, color: 'from-purple-500 to-purple-600' },
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                    <div key={i} className="glass-panel p-6 group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg text-white opacity-90 group-hover:opacity-100 transition-opacity`}><Icon size={24} /></div>
                            <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full ${stat.isPositive ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
                                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}{stat.change}
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const ActivityChart = () => {
    const data = [
        { name: 'Jan', income: 4000, expenses: 2400 },
        { name: 'Feb', income: 3000, expenses: 1398 },
        { name: 'Mar', income: 2000, expenses: 9800 },
        { name: 'Apr', income: 2780, expenses: 3908 },
        { name: 'May', income: 1890, expenses: 4800 },
        { name: 'Jun', income: 2390, expenses: 3800 },
        { name: 'Jul', income: 3490, expenses: 4300 },
    ]
    return (
        <div className="glass-panel p-6 h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Activity Overview</h2>
                    <p className="text-sm text-gray-400 font-medium">Income vs Expenses</p>
                </div>
            </div>
            <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} /><stop offset="95%" stopColor="#f43f5e" stopOpacity={0} /></linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                        <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dx={-10} />
                        <RechartsTooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.75rem', padding: '12px' }} itemStyle={{ color: '#f3f4f6' }} labelStyle={{ color: '#9ca3af', marginBottom: '4px' }} />
                        <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                        <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const SpendingBreakdown = () => {
    const data = [
        { name: 'Housing', value: 2400, color: '#3b82f6' },
        { name: 'Food', value: 1398, color: '#10b981' },
        { name: 'Shopping', value: 980, color: '#8b5cf6' },
        { name: 'Transport', value: 500, color: '#f59e0b' },
        { name: 'Entertainment', value: 390, color: '#f43f5e' },
    ]
    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <h2 className="text-lg font-bold text-white tracking-tight mb-2">Spending Breakdown</h2>
            <p className="text-sm text-gray-400 font-medium mb-4">Categorical analysis</p>
            <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0px 4px 6px ${entry.color}40)` }} />)}
                        </Pie>
                        <RechartsTooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.75rem' }} formatter={(val) => `$${val}`} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const Insights = () => (
    <div className="glass-panel p-6 h-full flex flex-col">
        <h2 className="text-lg font-bold text-white tracking-tight mb-4">Financial Insights</h2>
        <div className="space-y-4 flex-1">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"><div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 mt-0.5"><Info size={16} /></div><div><p className="text-sm text-gray-300 leading-relaxed"><span className="font-bold text-white">Housing</span> is your highest spending category this month.</p></div></div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"><div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5"><TrendingDown size={16} /></div><div><p className="text-sm text-gray-300 leading-relaxed">Great job! You've spent <span className="font-bold text-emerald-400">12% less</span> this month overall.</p></div></div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20"><div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 mt-0.5"><TrendingUp size={16} /></div><div><p className="text-sm text-gray-300 leading-relaxed">Your savings are actively on track to hit the goal.</p></div></div>
        </div>
    </div>
)

export const initialTransactions = [
    { id: 1, title: 'Apple Store', category: 'Electronics', type: 'expense', amount: 1299.00, date: '2026-04-03T14:45:00', icon: Apple, color: 'bg-gray-200 text-gray-800' },
    { id: 2, title: 'Salary Deposit', category: 'Income', type: 'income', amount: 4500.00, date: '2026-04-02T09:00:00', icon: ArrowDownRight, color: 'bg-emerald-500/20 text-emerald-500' },
    { id: 3, title: 'Starbucks', category: 'Food & Drink', type: 'expense', amount: 12.50, date: '2026-04-02T08:30:00', icon: Coffee, color: 'bg-orange-500/20 text-orange-500' },
    { id: 4, title: 'Nike Shoes', category: 'Shopping', type: 'expense', amount: 120.00, date: '2026-04-01T16:15:00', icon: ShoppingBag, color: 'bg-blue-500/20 text-blue-500' },
]

const RecentTransactions = () => {
    const { role } = useRole()
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [sortOrder, setSortOrder] = useState('date-desc')

    const filteredAndSortedTransactions = useMemo(() => {
        return initialTransactions.filter(tx => {
            const matchSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) || tx.category.toLowerCase().includes(searchTerm.toLowerCase())
            const matchType = filterType === 'all' || tx.type === filterType
            return matchSearch && matchType
        }).sort((a, b) => {
            if (sortOrder === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime()
            if (sortOrder === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime()
            if (sortOrder === 'amount-desc') return b.amount - a.amount
            if (sortOrder === 'amount-asc') return a.amount - b.amount
            return 0
        })
    }, [searchTerm, filterType, sortOrder])

    return (
        <div className="glass-panel p-6 flex flex-col h-full min-h-[450px]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-white tracking-tight">Recent Transactions</h2>
                <button className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors">View All</button>
            </div>

            <div className="flex flex-col xl:flex-row gap-3 mb-4 bg-gray-900/30 p-2 rounded-xl border border-gray-800">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                    <input type="text" placeholder="Search txns..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-gray-800/50 border border-gray-700/50 text-white text-xs rounded-lg p-1.5 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500">
                    <option value="all">All</option><option value="income">Income</option><option value="expense">Expense</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="bg-gray-800/50 border border-gray-700/50 text-white text-xs rounded-lg p-1.5 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500">
                    <option value="date-desc">Newest</option><option value="amount-desc">High Amt</option>
                </select>
            </div>

            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {filteredAndSortedTransactions.length > 0 ? filteredAndSortedTransactions.map((tx) => {
                    const Icon = tx.icon; const isIncome = tx.type === 'income'
                    return (
                        <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/40 transition-colors group cursor-pointer">
                            <div className="flex gap-4 items-center">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.color}`}><Icon size={18} /></div>
                                <div>
                                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{tx.title}</p>
                                    <p className="text-xs text-gray-500">{tx.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-right">
                                <div>
                                    <p className={`font-bold text-sm ${isIncome ? 'text-emerald-400' : 'text-gray-100'}`}>{isIncome ? '+' : '-'}${tx.amount.toFixed(2)}</p>
                                    <p className="text-[10px] text-gray-500 uppercase font-medium pt-0.5">{tx.type}</p>
                                </div>
                                {role === 'admin' && <button className="text-gray-500 hover:text-white bg-gray-800 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={14} /></button>}
                            </div>
                        </div>
                    )
                }) : <p className="text-sm text-gray-400 text-center py-6">No matching transactions.</p>}
            </div>
        </div>
    )
}

const QuickTransfer = () => {
    const { role } = useRole()
    return (
        <div className="glass-panel p-6 mt-6">
            <h2 className="text-lg font-bold text-white tracking-tight mb-4">Quick Transfer</h2>
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 flex items-center justify-between">
                <span className="text-3xl font-bold text-white"><span className="text-gray-500 mr-2">$</span>250</span>
                <button className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm flex gap-1 items-center hover:bg-gray-700 transition-colors">USD <ChevronDown size={14} /></button>
            </div>
            <button disabled={role === 'viewer'} className={`w-full mt-4 flex justify-center gap-2 font-bold py-3 rounded-xl transition-all ${role === 'admin' ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-95' : 'bg-gray-800 text-gray-500'}`}>
                <span>{role === 'admin' ? 'Send Money' : 'View Only'}</span><Send size={16} />
            </button>
        </div>
    )
}

// --- Main Dashboard Page ---
export default function Dashboard() {
    const { role } = useRole()
    const handleDownload = () => {
        const csv = ['Date,Title,Category,Type,Amount', ...initialTransactions.map(tx => `${tx.date},"${tx.title}","${tx.category}",${tx.type},${tx.amount}`)].join('\n')
        const link = document.createElement('a')
        link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
        link.download = 'financial_report.csv'
        link.click()
    }

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } } }

    return (
        <motion.div className="space-y-6 pb-12" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="flex justify-between items-end mb-8 mt-2">
                <div><h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard Overview</h1><p className="text-gray-400">Welcome back, Alex. Here's your data.</p></div>
                <div className="space-x-3 hidden sm:flex items-center">
                    <button onClick={handleDownload} className="px-4 py-2.5 glass-panel hover:bg-gray-800 text-sm font-medium transition-colors">Download CSV</button>
                    {role === 'admin' && <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] text-sm font-medium active:scale-95 transition-all">+ New Transaction</button>}
                </div>
            </motion.div>

            <motion.div variants={itemVariants}><StatCards /></motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6 flex flex-col">
                    <ActivityChart />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                        <SpendingBreakdown /><Insights />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col h-full gap-6">
                    <div className="flex-1"><RecentTransactions /></div>
                    <div className="mt-[-24px]"><QuickTransfer /></div>
                </motion.div>
            </div>
        </motion.div>
    )
}
